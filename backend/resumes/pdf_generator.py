from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER


def generate_resume_pdf(resume, data, output_path):

    doc = SimpleDocTemplate(
        output_path,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    styles["Title"].fontName = "Helvetica-Bold"
    styles["Title"].fontSize = 24
    styles["Title"].alignment = TA_CENTER

    styles["Heading2"].fontName = "Helvetica-Bold"
    styles["Heading2"].fontSize = 14

    styles["BodyText"].fontName = "Helvetica"
    styles["BodyText"].fontSize = 11
    styles["BodyText"].leading = 18

    story = []

    # ==================================================
    # NAME
    # ==================================================

    story.append(
        Paragraph(
            resume.full_name.upper(),
            styles["Title"]
        )
    )

    story.append(Spacer(1, 8))

    # ==================================================
    # CONTACT
    # ==================================================

    contact = (
        f"{resume.email} | "
        f"{resume.phone}"
    )

    story.append(
        Paragraph(
            contact,
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 8))

    story.append(
        Paragraph(
            "<font color='darkblue'>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</font>",
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 16))

    # ==================================================
    # PROFESSIONAL SUMMARY
    # ==================================================

    story.append(
        Paragraph(
            "<b>PROFESSIONAL SUMMARY</b>",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            data.get("professional_summary", ""),
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 16))

    # ==================================================
    # PROFESSIONAL EXPERIENCE
    # ==================================================

    story.append(
        Paragraph(
            "<b>PROFESSIONAL EXPERIENCE</b>",
            styles["Heading2"]
        )
    )

    experience = data.get("professional_experience", [])

    if isinstance(experience, dict):
        experience = [experience]

    for job in experience:

        title = job.get("title", "")
        company = job.get("company", "")
        dates = job.get("dates", "")

        story.append(
            Paragraph(
                f"<b>{title}</b>",
                styles["BodyText"]
            )
        )

        story.append(
            Paragraph(
                f"<i>{company} | {dates}</i>",
                styles["BodyText"]
            )
        )

        descriptions = job.get("description", [])

        if isinstance(descriptions, str):
            descriptions = [descriptions]

        for point in descriptions:
            story.append(
                Paragraph(
                    f"▪ {point}",
                    styles["BodyText"]
                )
            )

        story.append(Spacer(1, 10))

    # ==================================================
    # TECHNICAL SKILLS
    # ==================================================

    story.append(
        Paragraph(
            "<b>TECHNICAL SKILLS</b>",
            styles["Heading2"]
        )
    )

    skills = data.get("technical_skills", [])

    if isinstance(skills, str):
        skills = [skills]

    for skill in skills:
        story.append(
            Paragraph(
                f"▪ {skill}",
                styles["BodyText"]
            )
        )

    story.append(Spacer(1, 16))

    # ==================================================
    # EDUCATION
    # ==================================================

    story.append(
        Paragraph(
            "<b>EDUCATION</b>",
            styles["Heading2"]
        )
    )

    education = data.get("education", {})

    story.append(
        Paragraph(
            f"<b>{education.get('degree', '')}</b>",
            styles["BodyText"]
        )
    )

    story.append(
        Paragraph(
            education.get("institution", ""),
            styles["BodyText"]
        )
    )

    story.append(Spacer(1, 16))

    # ==================================================
    # ACHIEVEMENTS
    # ==================================================

    story.append(
        Paragraph(
            "<b>ACHIEVEMENTS</b>",
            styles["Heading2"]
        )
    )

    achievements = data.get("achievements", [])

    if isinstance(achievements, str):
        achievements = [achievements]

    for achievement in achievements:
        story.append(
            Paragraph(
                f"▪ {achievement}",
                styles["BodyText"]
            )
        )

    doc.build(story)

    return output_path