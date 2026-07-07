from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .cover_letter_pdf import generate_cover_letter_pdf
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
    generate_cover_letter,
    analyze_job_match,
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
class ResumeCoverLetterView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            # Return cached cover letter
            if resume.ai_cover_letter:
                return Response({
                    "resume_id": resume.id,
                    "title": resume.title,
                    "cover_letter": resume.ai_cover_letter,
                    "cached": True
                })

            text = get_resume_text(resume)

            cover_letter = generate_cover_letter(text)

            if "error" in cover_letter:
                return Response(
                    {"error": cover_letter["error"]},
                    status=429
                )

            # Save to database
            resume.ai_cover_letter = cover_letter
            resume.save()
            if resume.edited_cover_letter:
                return Response({
                    "resume_id": resume.id,
                    "title": resume.title,
                    "cover_letter": {
                        "cover_letter": resume.edited_cover_letter
                    },
                    "cached": True
                })
            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "cover_letter": cover_letter,
                "cached": False
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )
    def put(self, request, pk):

        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            cover_letter = request.data.get("cover_letter")

            if not cover_letter:
                return Response(
                    {"error": "Cover letter is required."},
                    status=400
                )

            resume.edited_cover_letter = cover_letter
            resume.save()

            return Response({
                "message": "Cover Letter Saved Successfully!"
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
                )
class ResumeCoverLetterPDFView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            # Use saved edited version if available
            if resume.edited_cover_letter:
                cover_letter = resume.edited_cover_letter

            else:

                text = get_resume_text(resume)

                response = generate_cover_letter(text)

                # If Gemini returned an error
                if "error" in response:
                    return Response(
                        {"error": response["error"]},
                        status=429
                    )

                cover_letter = response["cover_letter"]

            output_path = os.path.join(
                settings.MEDIA_ROOT,
                f"CoverLetter_{resume.id}.pdf"
            )

            generate_cover_letter_pdf(
                resume,
                cover_letter,
                output_path
            )

            return FileResponse(
                open(output_path, "rb"),
                as_attachment=True,
                filename=f"CoverLetter_{resume.id}.pdf"
            )

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )
        
class ResumeJobMatchView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        try:

            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            job_description = request.data.get(
                "job_description"
            )

            if not job_description:

                return Response(
                    {
                        "error":
                        "Job description is required."
                    },
                    status=400
                )

            text = get_resume_text(resume)

            result = analyze_job_match(
                text,
                job_description
            )

            return Response(result)

        except Resume.DoesNotExist:

            return Response(
                {
                    "error":
                    "Resume not found."
                },
                status=404
            )