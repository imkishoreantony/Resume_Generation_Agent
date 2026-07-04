from dotenv import load_dotenv
load_dotenv()

from resumes.gemini_service import improve_resume

sample = """
Python Developer
Skills: Python, Django
Education: B.Tech
"""

print(improve_resume(sample))