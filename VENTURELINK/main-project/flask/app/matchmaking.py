# from app import db
# from app.models import Upload
# from app.ai_match import get_match_score

# def find_matches_for_investor(db_session, investor_id):
#     """
#     Find the best matches for an investor based on funding range, description, and category.
#     """
#     # Fetch investor data (You can fetch this from your investors' table)
#     investor = db_session.query(Upload).filter(Upload.id == investor_id).first()
#     if not investor:
#         return []

#     # Fetch all startups from the uploads table
#     startups = db_session.query(Upload).filter(Upload.category != investor.category).all()  # Avoid same category matches

#     matches = []
#     for startup in startups:
#         # Compute similarity score based on description
#         score = get_match_score(investor.description, startup.description)
        
#         # Add matches with a reasonable score (e.g., greater than 0.5)
#         if score > 0.5:
#             matches.append({
#                 "id": startup.id,
#                 "name": startup.name,
#                 "category": startup.category,
#                 "funding_range": startup.funding_range,
#                 "match_score": score
#             })
    
#     # Sort matches by score
#     matches = sorted(matches, key=lambda x: x['match_score'], reverse=True)
#     return matches


from flask import Blueprint, jsonify

# Define the matchmaking blueprint
matchmaking = Blueprint('matchmaking', __name__)

# Define your routes for matchmaking
@matchmaking.route('/api/matchmaking/startup', methods=['GET'])
def matchmaking_startup():
    # Your matchmaking logic here...
    return jsonify({"message": "Matchmaking for startups"})

@matchmaking.route('/api/matchmaking/investor', methods=['GET'])
def matchmaking_investor():
    # Your matchmaking logic here...
    return jsonify({"message": "Matchmaking for investors"})
