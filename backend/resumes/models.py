from django.db import models
from django.contrib.auth.models import User


class Resume(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="resumes"
    )

    title = models.CharField(max_length=200)

    full_name = models.CharField(
        max_length=200,
        blank=True
    )

    email = models.EmailField(
        blank=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    summary = models.TextField(
        blank=True
    )

    skills = models.TextField(
        blank=True
    )

    education = models.TextField(
        blank=True
    )

    experience = models.TextField(
        blank=True
    )

    template = models.CharField(
        max_length=100,
        default="Classic"
    )

    resume_file = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True
    )

    
    ai_review = models.JSONField(
    blank=True,
    null=True
    )

    ai_resume = models.JSONField(
        blank=True,
        null=True
    )

    ai_assist = models.JSONField(
        blank=True,
        null=True
    )
    ai_cover_letter = models.JSONField(
    blank=True,
    null=True
    )
    edited_cover_letter = models.TextField(
    blank=True,
    null=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )
    

    def __str__(self):
        return self.title