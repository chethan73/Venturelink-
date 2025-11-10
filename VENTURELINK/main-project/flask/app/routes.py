# from flask import jsonify
# from app import app
# from app import db
# from app.matchmaking import find_matches_for_investor
# from app.models import Upload

# @app.route('/matches/investor/<int:investor_id>', methods=['GET'])
# def get_investor_matches(investor_id):
#     matches = find_matches_for_investor(db.session, investor_id)
#     return jsonify({"matches": matches})


# from flask import request, jsonify
# from app import app, db
# from app.matchmaking import find_matches_for_investor
# from app.models import Upload

# @app.route('/matches/investor/<int:investor_id>', methods=['GET'])
# def get_investor_matches(investor_id):
#     try:
#         matches = find_matches_for_investor(db.session, investor_id)
#         return jsonify({
#             "success": True,
#             "investor_id": investor_id,
#             "matches": matches
#         })
#     except Exception as e:
#         return jsonify({
#             "success": False,
#             "error": str(e)
#         }), 500


# app/routes.py

from flask import request, jsonify
from app import app, db
from app.matchmaking import find_matches_for_investor
from app.models import Upload
from app.smart_bot import generate_bot_response  # Assuming you have this import for the bot

# Flask route to fetch investor matches
@app.route('/matches/investor/<int:investor_id>', methods=['GET'])
def get_investor_matches(investor_id):
    try:
        # Assuming you have a function `find_matches_for_investor` that fetches matches for the investor
        matches = find_matches_for_investor(investor_id) 

        # Serialize the matches into JSON format
        if matches:
            matches_list = [match.serialize() for match in matches]  # Assuming `serialize()` method exists
        else:
            matches_list = []

        # Return the matches as a JSON response
        return jsonify({
            "success": True,
            "investor_id": investor_id,
            "matches": matches_list,
            "message": "Matches fetched successfully" if matches else "No matches found for this investor."
        })

    except Exception as e:
        # Log the error and return an error response
        app.logger.error(f"Error fetching matches for investor {investor_id}: {str(e)}")
        return jsonify({
            "success": False,
            "error": "An error occurred while processing the request.",
            "details": str(e)
        }), 500



@app.route('/api/smart_bot', methods=['POST'])
def smart_bot():
    try:
        # Get the user input from the request
        user_input = request.json.get("user_input", "")
        
        if not user_input:
            return jsonify({"error": "User input is required"}), 400
        
        # Get the response from the smart bot
        bot_response = generate_bot_response(user_input)
        
        # Return the bot's response
        return jsonify({"response": bot_response})
    
    except Exception as e:
        # Log the error (use logging for better tracking)
        app.logger.error(f"Error generating response from smart bot: {str(e)}")

        # Return a proper error response
        return jsonify({
            "success": False,
            "error": "An error occurred while processing the smart bot request.",
            "details": str(e)
        }), 500
