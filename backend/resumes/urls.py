from django.urls import path
from .views import ResumeCreateView, ResumeDetailView , ResumeUploadView , ResumeTextView , ResumeImproveView , ResumeGenerateView

urlpatterns = [
    path("", ResumeCreateView.as_view(), name="resume-list-create"),
   
    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),
    path("<int:pk>/text/", ResumeTextView.as_view(), name="resume-text"),
    path("<int:pk>/improve/", ResumeImproveView.as_view(), name="resume-improve"),
    path("<int:pk>/generate/", ResumeGenerateView.as_view(), name="resume-generate"),
]