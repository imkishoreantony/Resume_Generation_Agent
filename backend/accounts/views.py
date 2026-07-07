from rest_framework import generics
from django.db.models import Q
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated
from resumes.models import Resume

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {
                    "message": "Login successful",
                    "username": serializer.validated_data["user"].username
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        resumes = Resume.objects.filter(user=user)

        return Response({
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined.strftime("%d %B %Y"),

            "total_resumes": resumes.count(),
            "ai_reviews": resumes.exclude(ai_review=None).count(),
            "ai_generated": resumes.exclude(ai_resume=None).count(),
            "cover_letters": resumes.exclude(ai_cover_letter=None).count(),

            "level": "AI Resume Expert",
            "progress": 72,

            "recent_activity": [
                "Resume Generated",
                "Cover Letter Created",
                "Job Match Completed"
            ]
        })

    def put(self, request):
        user = request.user

        username = request.data.get("username")
        email = request.data.get("email")

        if username:
            user.username = username

        if email:
            user.email = email

        user.save()

        return Response({
            "message": "Profile updated successfully!",
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_200_OK)