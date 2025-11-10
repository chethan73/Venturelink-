import os
import openai
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

# Load your .env (one level up)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

smart_bot = Blueprint("smart_bot", __name__)

@smart_bot.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    # Respond to preflight CORS OPTIONS request
    if request.method == "OPTIONS":
        return '', 200

    # Actual POST handler
    user_msg = request.json.get("message", "")

    system_prompt = """
    You are VentureLink AI, a smart assistant for startups and investors.
    Help with funding, matchmaking, profiles, uploads, and investor/startup queries.
    Act like ChatGPT for general questions.
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_msg},
            ],
            temperature=0.7
        )

        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e), "reply": "Something went wrong."}), 500
