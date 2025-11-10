# # matching.py
# from flask import Blueprint, request, jsonify
# from .ai_integration import generate_openai_response, generate_cohere_response

# matching_bp = Blueprint('matching', __name__)

# @matching_bp.route('/match', methods=['POST'])
# def match():
#     data = request.get_json()

#     if not data or 'preferences' not in data:
#         return jsonify({"error": "Missing 'preferences' in the request"}), 400

#     preferences = data['preferences']

#     # AI matching logic
#     openai_match = generate_openai_response(f"Match users based on these preferences: {preferences}")
#     cohere_match = generate_cohere_response(f"Match users based on these preferences: {preferences}")

#     return jsonify({
#         "openai_match": openai_match,
#         "cohere_match": cohere_match
#     })
