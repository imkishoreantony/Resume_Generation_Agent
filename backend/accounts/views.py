from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import generics
from django.db.models import Count
from resumes.models import Resume
from django.db.models import Q
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer
from rest_framework.permissions import IsAuthenticated
from resumes.models import Resume
from rest_framework.views import APIView
from .models import UserProfile
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

        profile, created = UserProfile.objects.get_or_create(
            user=user
        )

        resumes = Resume.objects.filter(user=user)

        return Response({
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined.strftime("%d %B %Y"),

            "profile_picture": (
                request.build_absolute_uri(profile.profile_picture.url)
                if profile.profile_picture
                else None
            ),

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

        profile, created = UserProfile.objects.get_or_create(
            user=user
        )

        username = request.data.get("username")
        email = request.data.get("email")

        # Check username
        if username and username != user.username:
            if User.objects.filter(username=username).exists():
                return Response(
                    {
                        "error": "Username already exists."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.username = username

        # Check email
        if email and email != user.email:
            if User.objects.filter(email=email).exists():
                return Response(
                    {
                        "error": "Email already exists."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.email = email

        user.save()

        return Response(
            {
                "message": "Profile updated successfully!",
                "username": user.username,
                "email": user.email,
            },
            status=status.HTTP_200_OK
        )
    
class ProfilePictureUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile, created = UserProfile.objects.get_or_create(
    user=request.user
)

        image = request.FILES.get("profile_picture")

        if not image:
            return Response(
                {"error": "No image uploaded."},
                status=status.HTTP_400_BAD_REQUEST
            )

        profile.profile_picture = image
        profile.save()

        return Response({
            "message": "Profile picture updated successfully!",
            "profile_picture": request.build_absolute_uri(
                profile.profile_picture.url
            )
        })
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        # Check old password
        if not user.check_password(old_password):
            return Response(
                {"error": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check new passwords match
        if new_password != confirm_password:
            return Response(
                {"error": "New passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate password strength
        try:
            validate_password(new_password, user)
        except ValidationError as e:
            return Response(
                {"error": e.messages},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save password
        user.set_password(new_password)
        user.save()

        return Response({
            "message": "Password changed successfully!"
        })
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):

        user = request.user

        user.delete()

        return Response(
            {
                "message": "Account deleted successfully!"
            },
            status=status.HTTP_200_OK
        )
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        resumes = Resume.objects.filter(
            user=user
        ).order_by("-created_at")

        recent = resumes[:5]

        recent_activity = [
            {
                "title": resume.title,
                "created_at": resume.created_at.strftime("%d %b %Y"),
            }
            for resume in recent
        ]

        latest_resumes = [
            {
                "id": resume.id,
                "title": resume.title,
                "template": resume.template,
                "created_at": resume.created_at.strftime("%d %b %Y"),
                "ai_review": resume.ai_review is not None,
                "ai_generated": resume.ai_resume is not None,
                "ai_assisted": resume.ai_assist is not None,
                "cover_letter": resume.ai_cover_letter is not None,
            }
            for resume in recent
        ]

        return Response({

            "username": user.username,

            "stats": {
                "total_resumes": resumes.count(),

                "ai_reviews": resumes.filter(
                    ai_review__isnull=False
                ).count(),

                "ai_generated": resumes.filter(
                    ai_resume__isnull=False
                ).count(),

                "ai_assisted": resumes.filter(
                    ai_assist__isnull=False
                ).count(),

                "cover_letters": resumes.filter(
                    ai_cover_letter__isnull=False
                ).count(),
            },

            "recent_activity": recent_activity,

            "latest_resumes": latest_resumes,

        })