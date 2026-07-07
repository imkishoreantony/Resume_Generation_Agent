from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor


def generate_cover_letter_pdf(resume, cover_letter, output_path):

    doc = SimpleDocTemplate(output_path)

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    title_style.alignment = TA_CENTER
    title_style.textColor = HexColor("#2563EB")

    normal = styles["Normal"]
    normal.leading = 22

    story = []

    story.append(
        Paragraph(
            "AI Generated Cover Letter",
            title_style
        )
    )

    story.append(
        Paragraph("<br/><br/>", normal)
    )

    story.append(
        Paragraph(
            cover_letter.replace("\n", "<br/>"),
            normal
        )
    )

    doc.build(story)