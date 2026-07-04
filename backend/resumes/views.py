from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import extract_text_from_pdf
from .models import Resume
from .serializers import ResumeSerializer
from .gemini_service import improve_resume , generate_resume
from rest_framework.views import APIView
from rest_framework.response import Response

class ResumeCreateView(generics.ListCreateAPIView):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]

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