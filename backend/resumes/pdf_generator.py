from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_resume_pdf(data, output_path):

    doc = SimpleDocTemplate(output_path)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph("<b>AI Generated Resume</b>", styles["Title"])
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "<b>Professional Summary</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            data.get("professional_summary", ""),
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Technical Skills</b>",
            styles["Heading2"]
        )
    )

    skills = data.get("technical_skills", [])

    for skill in skills:
        story.append(
            Paragraph(f"• {skill}", styles["BodyText"])
        )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Achievements</b>",
            styles["Heading2"]
        )
    )

    achievements = data.get("achievements", [])

    if isinstance(achievements, str):
        achievements = [achievements]

    for achievement in achievements:
        story.append(
            Paragraph(
                f"• {achievement}",
                styles["BodyText"]
            )
        )

    doc.build(story)

    return output_path