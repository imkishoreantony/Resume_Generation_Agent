from rest_framework import serializers
from .models import Resume
import os


class ResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = "__all__"
        read_only_fields = [
            "user",
            "created_at",
            "updated_at",
        ]

    def validate_resume_file(self, value):
        allowed_extensions = [".pdf", ".doc", ".docx"]

        ext = os.path.splitext(value.name)[1].lower()

        if ext not in allowed_extensions:
            raise serializers.ValidationError(
                "Only PDF, DOC and DOCX files are allowed."
            )

        return value