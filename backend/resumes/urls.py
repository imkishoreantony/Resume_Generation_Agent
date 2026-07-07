from django.urls import path
from .views import ResumeCreateView, ResumeDetailView , ResumeUploadView , ResumeTextView , ResumeImproveView , ResumeGenerateView , ResumeDownloadView , ResumeAssistView , ResumeCoverLetterView , ResumeCoverLetterPDFView , ResumeJobMatchView

urlpatterns = [
    path("", ResumeCreateView.as_view(), name="resume-list-create"),
   
    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),
    path("<int:pk>/text/", ResumeTextView.as_view(), name="resume-text"),
    path("<int:pk>/improve/", ResumeImproveView.as_view(), name="resume-improve"),
    path("<int:pk>/generate/", ResumeGenerateView.as_view(), name="resume-generate"),
    path("<int:pk>/download/", ResumeDownloadView.as_view(), name="resume-download"),
    path("<int:pk>/assist/", ResumeAssistView.as_view(), name="resume-assist"),
    path(
    "<int:pk>/cover-letter/",
    ResumeCoverLetterView.as_view(),
    name="resume-cover-letter",
    ),
    path(
    "<int:pk>/cover-letter/download/",
    ResumeCoverLetterPDFView.as_view(),
    name="cover-letter-download",
    ),
    path(
    "<int:pk>/job-match/",
    ResumeJobMatchView.as_view(),
    name="job-match",
),
]