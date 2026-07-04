import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def improve_resume(resume_text):
    prompt = f"""
You are an expert resume reviewer.

Analyze the following resume.

Give:
1. An improved professional summary.
2. Missing technical skills.
3. Resume improvement suggestions.
4. ATS optimization tips.

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    return response.text