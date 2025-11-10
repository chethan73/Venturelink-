# import openai
# import cohere
# import os
# from dotenv import load_dotenv

# # Load .env from the correct path
# dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# load_dotenv(dotenv_path)

# openai.api_key = os.getenv("OPENAI_API_KEY")
# cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))

# def generate_openai_response(message):
#     try:
#         response = openai.Completion.create(
#             engine="text-davinci-003",
#             prompt=message,
#             max_tokens=150,
#             n=1,
#             temperature=0.7,
#         )
#         return response.choices[0].text.strip()
#     except Exception as e:
#         return f"OpenAI error: {str(e)}"

# def generate_cohere_response(message):
#     try:
#         response = cohere_client.generate(
#             model="command-xlarge-nightly",
#             prompt=message,
#             max_tokens=150,
#             temperature=0.7
#         )
#         return response.generations[0].text.strip()
#     except Exception as e:
#         return f"Cohere error: {str(e)}"
