from django.urls import path
from .views import ResumeCreateView, ResumeDetailView , ResumeUploadView , ResumeTextView

urlpatterns = [
    path("", ResumeCreateView.as_view(), name="resume-list-create"),
   
    path("<int:pk>/", ResumeDetailView.as_view(), name="resume-detail"),
    path("<int:pk>/text/", ResumeTextView.as_view(), name="resume-text"),
    
]