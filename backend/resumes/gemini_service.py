import os
import json
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def improve_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the resume below.

Return ONLY valid JSON.

Do NOT write explanations.

Do NOT use markdown.

Do NOT wrap the JSON inside ```.

Return exactly this format:

{{
    "professional_summary": "",

    "missing_skills": [
        ""
    ],

    "ats_score": 0,

    "strengths": [
        ""
    ],

    "suggestions": [
        ""
    ]
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)
def generate_resume(resume_text):
    prompt = f"""
You are an expert professional resume writer.

Rewrite the following resume into a modern ATS-friendly resume.

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use ```.

Return exactly this format:

{{
    "professional_summary": "",

    "technical_skills": [
        ""
    ],

    "professional_experience": "",

    "projects": "",

    "education": "",

    "certifications": "",

    "achievements": ""
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)