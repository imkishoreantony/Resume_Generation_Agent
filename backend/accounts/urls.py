from django.urls import path
from .views import ProfileView, RegisterView, LoginView , ProfilePictureUploadView , ChangePasswordView , DeleteAccountView , DashboardView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),

    path("dashboard/", DashboardView.as_view(), name="dashboard"),

    path("profile/", ProfileView.as_view(), name="profile"),

    path(
        "profile/picture/",
        ProfilePictureUploadView.as_view(),
        name="profile-picture",
    ),

    path(
        "profile/change-password/",
        ChangePasswordView.as_view(),
        name="change-password",
    ),

    path(
        "profile/delete/",
        DeleteAccountView.as_view(),
        name="delete-account",
    ),
]