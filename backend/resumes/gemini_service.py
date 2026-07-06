import os
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def clean_json(text):
    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.startswith("```"):
        text = text.replace("```", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    return text.strip()


def ask_gemini(prompt):
    """
    Sends prompt to Gemini and safely returns JSON.
    """

    try:
        response = model.generate_content(prompt)

        text = clean_json(response.text)

        return json.loads(text)

    except Exception as e:
        return {
            "error": str(e)
        }


def improve_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the resume below.

Return ONLY valid JSON.

Return exactly this format:

{{
    "professional_summary": "",
    "missing_skills": [""],
    "ats_score": 0,
    "strengths": [""],
    "suggestions": [""]
}}

Resume:

{resume_text}
"""

    return ask_gemini(prompt)


def generate_resume(resume_text):
    prompt = f"""
You are an expert professional resume writer.

Rewrite the following resume into a modern ATS-friendly resume.

IMPORTANT:

Do NOT invent:
- Companies
- Job titles
- Experience
- Projects
- Certifications
- Achievements

Improve only the writing.

Return ONLY valid JSON.

Return exactly this structure:

{{
    "professional_summary": "",

    "technical_skills": [
        ""
    ],

    "professional_experience": [
        {{
            "title": "",
            "company": "",
            "dates": "",
            "description": [
                ""
            ]
        }}
    ],

    "projects": [
        {{
            "title": "",
            "description": ""
        }}
    ],

    "education": {{
        "degree": "",
        "institution": ""
    }},

    "certifications": [
        ""
    ],

    "achievements": [
        ""
    ]
}}

Resume:

{resume_text}
"""

    return ask_gemini(prompt)


def assist_resume(resume_text):
    prompt = f"""
You are a professional resume writing assistant.

Your task is to improve the resume while keeping all facts exactly the same.

Rules:

- Never invent companies.
- Never invent job titles.
- Never invent projects.
- Never invent certifications.
- Never invent achievements.
- Never invent experience.

You MAY:

- Improve grammar
- Improve ATS keywords
- Rewrite the summary
- Rewrite experience bullet points
- Rewrite project descriptions
- Make the resume sound more professional

Return ONLY valid JSON.

Return exactly this structure:

{{
    "professional_summary": "",

    "technical_skills": [
        ""
    ],

    "professional_experience": [
        {{
            "title": "",
            "company": "",
            "dates": "",
            "description": [
                ""
            ]
        }}
    ],

    "projects": [
        {{
            "title": "",
            "description": ""
        }}
    ],

    "education": {{
        "degree": "",
        "institution": ""
    }},

    "certifications": [
        ""
    ],

    "achievements": [
        ""
    ]
}}

Resume:

{resume_text}
"""

    return ask_gemini(prompt)