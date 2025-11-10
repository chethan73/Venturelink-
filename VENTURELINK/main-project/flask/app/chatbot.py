# # chatbot.py
# from flask import Blueprint, request, jsonify
# from .ai_integration import generate_openai_response, generate_cohere_response

# chatbot_bp = Blueprint('chatbot', __name__)

# @chatbot_bp.route('/chat', methods=['POST'])
# def chat():
#     data = request.get_json()

#     if not data or 'message' not in data:
#         return jsonify({"error": "Missing 'message' in the request"}), 400

#     message = data['message']

#     # Get response from both OpenAI and Cohere
#     openai_reply = generate_openai_response(message)
#     cohere_reply = generate_cohere_response(message)


#     return jsonify({
#         "openai_response": openai_reply,
#         "cohere_response": cohere_reply
#     })
