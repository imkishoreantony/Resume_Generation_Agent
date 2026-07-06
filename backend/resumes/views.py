from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import FileResponse
from django.conf import settings

import os

from .models import Resume
from .serializers import ResumeSerializer
from .utils import extract_text_from_pdf
from .pdf_generator import generate_resume_pdf

from .gemini_service import (
    improve_resume,
    generate_resume,
    assist_resume,
)


# ==========================================================
# Helper Function
# ==========================================================

def get_resume_text(resume):
    """
    Returns resume text from uploaded PDF if available,
    otherwise builds text from manually entered resume fields.
    """

    if resume.resume_file:
        return extract_text_from_pdf(resume.resume_file.path)

    return f"""
Title:
{resume.title}

Name:
{resume.full_name}

Email:
{resume.email}

Phone:
{resume.phone}

Summary:
{resume.summary}

Skills:
{resume.skills}

Education:
{resume.education}

Experience:
{resume.experience}
"""


# ==========================================================
# Resume CRUD
# ==========================================================

class ResumeCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [
        JSONParser,
        MultiPartParser,
        FormParser,
    ]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ResumeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class ResumeUploadView(generics.CreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# ==========================================================
# Resume Text
# ==========================================================

class ResumeTextView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            text = get_resume_text(resume)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "text": text
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )


# ==========================================================
# AI Review
# ==========================================================

class ResumeImproveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

           # Return cached review if available
            if resume.ai_review:
                return Response({
                    "resume_id": resume.id,
                    "title": resume.title,
                    "ai_suggestions": resume.ai_review,
                    "cached": True
                })

            # Generate review
            text = get_resume_text(resume)

            ai_response = improve_resume(text)

            if "error" in ai_response:
                return Response(
                    {"error": ai_response["error"]},
                    status=429
                )

            # Save to database
            resume.ai_review = ai_response
            resume.save()

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "ai_suggestions": ai_response,
                "cached": False
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )


# ==========================================================
# AI Resume Assistant
# ==========================================================

class ResumeAssistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            # Return cached assist
            if resume.ai_assist:
                return Response({
                    "resume_id": resume.id,
                    "title": resume.title,
                    "improved_resume": resume.ai_assist,
                    "cached": True
                })

            text = get_resume_text(resume)

            ai_response = assist_resume(text)

            if "error" in ai_response:
                return Response(
                    {"error": ai_response["error"]},
                    status=429
                )

            # Save to DB
            resume.ai_assist = ai_response
            resume.save()

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "improved_resume": ai_response,
                "cached": False
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )

# ==========================================================
# AI Resume Generator
# ==========================================================

class ResumeGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

           # If already generated, return cached version
            if resume.ai_resume:
                return Response({
                    "resume_id": resume.id,
                    "title": resume.title,
                    "generated_resume": resume.ai_resume,
                    "cached": True
                })

            # Generate only once
            text = get_resume_text(resume)

            generated_resume = generate_resume(text)

            # Gemini error
            if "error" in generated_resume:
                return Response(
                    {"error": generated_resume["error"]},
                    status=429
                )

            # Save into database
            resume.ai_resume = generated_resume
            resume.save()

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "generated_resume": generated_resume,
                "cached": False
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )


# ==========================================================
# PDF Download
# ==========================================================

class ResumeDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            # Use cached AI Resume if available
            if resume.ai_resume:
                generated_resume = resume.ai_resume

            else:
                text = get_resume_text(resume)

                generated_resume = generate_resume(text)

                if "error" in generated_resume:
                    return Response(
                        {"error": generated_resume["error"]},
                        status=429
                    )

                resume.ai_resume = generated_resume
                resume.save()

            output_path = os.path.join(
                settings.MEDIA_ROOT,
                f"AI_Resume_{resume.id}.pdf"
            )

            generate_resume_pdf(
                resume,
                generated_resume,
                output_path
            )

            return FileResponse(
                open(output_path, "rb"),
                as_attachment=True,
                filename=f"AI_Resume_{resume.id}.pdf"
            )

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )