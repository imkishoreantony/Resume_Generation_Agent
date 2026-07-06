from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .utils import extract_text_from_pdf
from .models import Resume
from .serializers import ResumeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .pdf_generator import generate_resume_pdf
from django.http import FileResponse
from django.conf import settings
import os
from .gemini_service import (
    improve_resume,
    generate_resume,
    assist_resume,
)
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

    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
from rest_framework.response import Response
from rest_framework.views import APIView


class ResumeTextView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            if not resume.resume_file:
                return Response({
                    "error": "No resume file uploaded."
                }, status=400)

            text = extract_text_from_pdf(
                resume.resume_file.path
            )

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "text": text
            })

        except Resume.DoesNotExist:
            return Response({
                "error": "Resume not found."
            }, status=404)
class ResumeImproveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            if not resume.resume_file:
                return Response(
                    {"error": "No resume file uploaded."},
                    status=400
                )

            text = extract_text_from_pdf(
                resume.resume_file.path
            )

            ai_response = improve_resume(text)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "ai_suggestions": ai_response
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )
class ResumeAssistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            # If a PDF exists, improve the uploaded resume
            if resume.resume_file:

                text = extract_text_from_pdf(
                    resume.resume_file.path
                )

            else:
                # Improve the manually created resume
                text = f"""
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

            ai_response = assist_resume(text)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "improved_resume": ai_response
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )
class ResumeGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            if not resume.resume_file:
                return Response(
                    {"error": "No resume file uploaded."},
                    status=400
                )

            text = extract_text_from_pdf(
                resume.resume_file.path
            )

            generated_resume = generate_resume(text)

            return Response({
                "resume_id": resume.id,
                "title": resume.title,
                "generated_resume": generated_resume
            })

        except Resume.DoesNotExist:
            return Response(
                {"error": "Resume not found."},
                status=404
            )
class ResumeDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

            if not resume.resume_file:
                return Response(
                    {"error": "No resume file uploaded."},
                    status=400
                )

            text = extract_text_from_pdf(
                resume.resume_file.path
            )

            generated_resume = generate_resume(text)

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
