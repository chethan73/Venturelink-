# from flask import Flask, jsonify
# from flask_cors import CORS
# import psycopg2

# app = Flask(__name__)
# CORS(app)  # Enable CORS for cross-origin requests

# # Database connection
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="Venturelink_db",  # Replace with your database name
#         user="postgres",  # Replace with your database user
#         password="root"  # Replace with your database password
#     )
#     return conn
# # DB_USERNAME=postgres
# # DB_PASSWORD=root
# # DB_DATABASE=Venturelink_db
# # DB_HOST=localhost
# # DB_PORT=5432
# # PORT=5000


# @app.route('/api/matchmaking', methods=['GET'])
# def matchmaking():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute("SELECT name, category, fundingneeds, description FROM uploads;")
#     matches = cur.fetchall()
#     cur.close()
#     conn.close()
    
#     # Format the data to be JSON-friendly
#     formatted_matches = [{"name": match[0], "category": match[1], "funding_range": match[2], "description": match[3]} for match in matches]
    
#     return jsonify(formatted_matches)

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)



# from flask import Flask, jsonify
# from flask_cors import CORS
# import psycopg2

# app = Flask(__name__)
# CORS(app)  # Enable CORS for cross-origin requests

# # Database connection
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="Venturelink_db",  # Replace with your database name
#         user="postgres",  # Replace with your database user
#         password="root"  # Replace with your database password
#     )
#     return conn

# @app.route('/api/matchmaking', methods=['GET'])
# def matchmaking():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     # Updated SQL query to fetch 'sector' as well
#     cur.execute("SELECT name, category, fundingneeds, description, sector FROM uploads;")
#     matches = cur.fetchall()
#     cur.close()
#     conn.close()
    
#     # Format the data to be JSON-friendly, now including 'sector'
#     formatted_matches = [{"name": match[0], "category": match[1], "funding_range": match[2], "description": match[3], "sector": match[4]} for match in matches]
    
#     return jsonify(formatted_matches)

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)


# from flask import Flask, jsonify
# from flask_cors import CORS
# import psycopg2

# app = Flask(__name__)
# CORS(app)  # Enable CORS for cross-origin requests

# # Database connection
# def get_db_connection():
#     conn = psycopg2.connect(
#         host="localhost",
#         database="Venturelink_db",  # Replace with your database name
#         user="postgres",  # Replace with your database user
#         password="root"  # Replace with your database password
#     )
#     return conn

# # Route for Startup sector matchmaking
# @app.route('/api/matchmaking/startup', methods=['GET'])
# def matchmaking_startup():
#     conn = get_db_connection()
#     cur = conn.cursor()
    
#     # Fetch only rows where sector is 'Startup'
#     cur.execute("SELECT name, category, fundingneeds, description, sector FROM uploads WHERE sector = 'Startup';")
#     matches = cur.fetchall()
    
#     cur.close()
#     conn.close()
    
#     # Format the data and calculate a new value
#     formatted_matches = []
#     for match in matches:
#         name, category, fundingneeds, description, sector = match
        
#         # Example calculation based on fundingneeds and category
#         calculated_value = 0
        
#         if fundingneeds and '₹' in fundingneeds:
#             if '1L - 5L' in fundingneeds:
#                 calculated_value += 5
#             elif '5L - 10L' in fundingneeds:
#                 calculated_value += 10
#             elif '10L - 25L' in fundingneeds:
#                 calculated_value += 15
#             elif '25L - 50L' in fundingneeds:
#                 calculated_value += 20
#             elif '50L - 1Cr' in fundingneeds:
#                 calculated_value += 25
#             elif '1Cr+' in fundingneeds:
#                 calculated_value += 30
        
#         if category:
#             if 'IT' in category:
#                 calculated_value += 5
#             elif 'Healthcare' in category:
#                 calculated_value += 8
#             elif 'Finance' in category:
#                 calculated_value += 10
#             elif 'Marketing' in category:
#                 calculated_value += 6
#             else:
#                 calculated_value += 3  # Default if other category
        
#         formatted_matches.append({
#             "name": name,
#             "category": category,
#             "funding_range": fundingneeds,
#             "description": description,
#             "sector": sector,
#             "calculated_value": calculated_value  # Added calculated field
#         })
    
#     return jsonify(formatted_matches)


# # Route for Investor sector matchmaking
# @app.route('/api/matchmaking/investor', methods=['GET'])
# def matchmaking_investor():
#     conn = get_db_connection()
#     cur = conn.cursor()
    
#     # Fetch only rows where sector is 'Investor'
#     cur.execute("SELECT name, category, fundingneeds, description, sector FROM uploads WHERE sector = 'Investor';")
#     matches = cur.fetchall()
    
#     cur.close()
#     conn.close()
    
#     # Format the data and calculate a new value
#     formatted_matches = []
#     for match in matches:
#         name, category, fundingneeds, description, sector = match
        
#         # Example calculation based on fundingneeds and category
#         calculated_value = 0
        
#         if fundingneeds and '₹' in fundingneeds:
#             if '1L - 5L' in fundingneeds:
#                 calculated_value += 5
#             elif '5L - 10L' in fundingneeds:
#                 calculated_value += 10
#             elif '10L - 25L' in fundingneeds:
#                 calculated_value += 15
#             elif '25L - 50L' in fundingneeds:
#                 calculated_value += 20
#             elif '50L - 1Cr' in fundingneeds:
#                 calculated_value += 25
#             elif '1Cr+' in fundingneeds:
#                 calculated_value += 30
        
#         if category:
#             if 'IT' in category:
#                 calculated_value += 5
#             elif 'Healthcare' in category:
#                 calculated_value += 8
#             elif 'Finance' in category:
#                 calculated_value += 10
#             elif 'Marketing' in category:
#                 calculated_value += 6
#             else:
#                 calculated_value += 3  # Default if other category
        
#         formatted_matches.append({
#             "name": name,
#             "category": category,
#             "funding_range": fundingneeds,
#             "description": description,
#             "sector": sector,
#             "calculated_value": calculated_value  # Added calculated field
#         })
    
#     return jsonify(formatted_matches)


# if __name__ == '__main__':
#     app.run(debug=True, port=8000)


# from flask import Flask, jsonify, make_response, request
# from flask_cors import CORS
# import psycopg2
# import os
# import requests
# from datetime import datetime

# app = Flask(__name__)

# # CORS Configuration (Allow requests from specific origin)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Replace with the actual frontend URL if needed

# # Database connection function
# def get_db_connection():
#     try:
#         conn = psycopg2.connect(
#             host="localhost",
#             database="Venturelink_db",  # Your database name
#             user="postgres",            # Your database user
#             password="root"             # Your database password
#         )
#         conn.autocommit = True
#         return conn
#     except Exception as e:
#         print(f"Error connecting to the database: {e}")
#         return None

# # Function to calculate a value based on funding needs and category
# def calculate_value(fundingneeds, category):
#     calculated_value = 0
    
#     # Funding needs
#     if fundingneeds:
#         if '1L - 5L' in fundingneeds:
#             calculated_value += 5
#         elif '5L - 10L' in fundingneeds:
#             calculated_value += 10
#         elif '10L - 25L' in fundingneeds:
#             calculated_value += 15
#         elif '25L - 50L' in fundingneeds:
#             calculated_value += 20
#         elif '50L - 1Cr' in fundingneeds:
#             calculated_value += 25
#         elif '1Cr+' in fundingneeds:
#             calculated_value += 30
    
#     # Category
#     if category:
#         if 'IT' in category:
#             calculated_value += 5
#         elif 'Healthcare' in category:
#             calculated_value += 8
#         elif 'Finance' in category:
#             calculated_value += 10
#         elif 'Marketing' in category:
#             calculated_value += 6
#         else:
#             calculated_value += 3  # Other categories

#     return calculated_value

# # Route for Startup sector matchmaking
# @app.route('/api/matchmaking/startup', methods=['GET'])
# def matchmaking_startup():
#     conn = get_db_connection()
#     if not conn:
#         return make_response(jsonify({"error": "Database connection failed"}), 500)

#     try:
#         with conn.cursor() as cur:
#             cur.execute("SELECT name, category, fundingneeds, description, sector FROM uploads WHERE sector = 'Startup';")
#             matches = cur.fetchall()
#     except Exception as e:
#         conn.rollback()
#         return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
#     finally:
#         conn.close()

#     formatted_matches = []
#     for match in matches:
#         name, category, fundingneeds, description, sector = match
#         calculated_value = calculate_value(fundingneeds, category)
        
#         formatted_matches.append({
#             "name": name,
#             "category": category,
#             "funding_range": fundingneeds,
#             "description": description,
#             "sector": sector,
#             "calculated_value": calculated_value
#         })

#     return make_response(jsonify(formatted_matches), 200)

# # Route for Investor sector matchmaking
# @app.route('/api/matchmaking/investor', methods=['GET'])
# def matchmaking_investor():
#     conn = get_db_connection()
#     if not conn:
#         return make_response(jsonify({"error": "Database connection failed"}), 500)

#     try:
#         with conn.cursor() as cur:
#             cur.execute("SELECT name, category, fundingneeds, description, sector,rating,user_id FROM uploads WHERE sector = 'Investor';")
#             matches = cur.fetchall()
#     except Exception as e:
#         conn.rollback()
#         return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
#     finally:
#         conn.close()

#     formatted_matches = []
#     for match in matches:
#         name, category, fundingneeds, description, sector,rating,user_id = match
#         calculated_value = calculate_value(fundingneeds, category)
        
#         formatted_matches.append({
#             "name": name,
#             "category": category,
#             "funding_range": fundingneeds,
#             "description": description,
#             "sector": sector,
#             "calculated_value": calculated_value,
#             "user_id": user_id,
#             "rating": rating
#         })

#     return make_response(jsonify(formatted_matches), 200)

# # @app.route('/api/connect', methods=['POST'])
# # def connect():
# #     data = request.get_json()
# #     user_id = data.get('user_id')
# #     match_id = data.get('match_id')  # This is target_upload_id

# #     if not user_id or not match_id:
# #         return jsonify({"error": "user_id and match_id are required"}), 400

# #     conn = get_db_connection()
# #     if not conn:
# #         return jsonify({"error": "Database connection failed"}), 500

# #     try:
# #         with conn.cursor() as cur:
# #             # Insert a new connection into the connections table
# #             cur.execute("""
# #                 INSERT INTO connections (user_id, target_upload_id, connected_at)
# #                 VALUES (%s, %s, %s)
# #                 RETURNING id;
# #             """, (user_id, match_id, datetime.utcnow()))

# #             # Get the generated connection id
# #             connection_id = cur.fetchone()[0]

# #         conn.commit()

# #         return jsonify({
# #             "message": "Connection created successfully",
# #             "connection_id": connection_id
# #         }), 201

# #     except Exception as e:
# #         conn.rollback()
# #         return jsonify({"error": f"Failed to create connection: {e}"}), 500

# #     finally:
# #         conn.close()
# # OpenRouter API key (ensure you have the correct API key)
# @app.route('/api/smart_bot', methods=['POST'])
# def smart_bot():
#     data = request.get_json()

#     # Check if 'message' is provided in the request body
#     if not data or 'message' not in data:
#         return make_response(jsonify({"error": "Missing 'message' in the request"}), 400)

#     # Get the API key securely from the environment
#     api_key = os.getenv("OPENROUTER_API_KEY")
#     if not api_key:
#         return make_response(jsonify({"error": "API Key missing"}), 500)

#     # Set headers for the API request
#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json",
#         "X-Title": "VentureLink SmartBot",  # You can change this to match your app's name or title
#         "HTTP-Referer": "http://localhost:3000"  # You can adjust this URL to match your app's frontend URL
#     }

#     user_message = data['message']

#     body = {
#         "model": "openai/gpt-4",  # Use a valid model here; double-check "openai/gpt-4o" if needed
#         "messages": [
#             {"role": "system", "content": "You are SmartBot, a helpful assistant."},
#             {"role": "user", "content": user_message}
#         ]
#     }

#     try:
#         # Make the API request to OpenRouter
#         response = requests.post(
#             "https://openrouter.ai/api/v1/chat/completions", 
#             headers=headers, 
#             json=body
#         )
        
#         # Check for common HTTP response errors
#         if response.status_code == 401:
#             return make_response(jsonify({"error": "Unauthorized - Check your API key"}), 401)
#         elif response.status_code == 403:
#             return make_response(jsonify({"error": "Forbidden - Access denied"}), 403)
#         elif response.status_code == 404:
#             return make_response(jsonify({"error": "Not Found - API endpoint not available"}), 404)
#         elif response.status_code == 500:
#             return make_response(jsonify({"error": "Internal Server Error - Try again later"}), 500)
#         elif response.status_code != 200:
#             return make_response(jsonify({"error": f"OpenRouter API error: {response.text}"}), response.status_code)

#         # Extract the response content from OpenRouter
#         response_data = response.json()
#         reply = response_data.get('choices', [{}])[0].get('message', {}).get('content', 'No response')

#         return make_response(jsonify({"reply": reply}), 200)

#     except requests.exceptions.RequestException as e:
#         # Handle any other errors, e.g., network-related issues
#         return make_response(jsonify({"error": f"Request failed: {str(e)}"}), 500)

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)


# from flask import Flask, jsonify, make_response, request
# from flask_cors import CORS
# import psycopg2
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.metrics.pairwise import cosine_similarity
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import requests
# import time
# import re

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# # 📦 Database connection
# def get_db_connection():
#     try:
#         conn = psycopg2.connect(
#             host="localhost",
#             database="Venturelink_db",
#             user="postgres",
#             password="root"
#         )
#         conn.autocommit = True
#         return conn
#     except Exception as e:
#         print(f"DB connection error: {e}")
#         return None

# # 📄 Load Uploads Data
# def get_upload_data():
#     conn = get_db_connection()
#     df = pd.read_sql("SELECT * FROM uploads", conn)
#     conn.close()
#     return df

# # 🧼 Preprocess for cosine similarity
# # def preprocess(df):
# #     funding_map = {
# #         '₹1L - ₹5L': 1,
# #         '₹5L - ₹10L': 2,
# #         '₹10L - ₹25L': 3,
# #         '₹25L - ₹50L': 4,
# #         '₹50L - ₹1Cr': 5,
# #         '₹1Cr+': 6
# #     }
# #     df['funding_code'] = df['fundingneeds'].map(funding_map).fillna(0)
# #     df['rating'] = pd.to_numeric(df['rating'], errors='coerce').fillna(0)

# #     encoder = OneHotEncoder()
# #     encoded_category = encoder.fit_transform(df[['category']].fillna("Unknown")).toarray()

# #     features = np.hstack((df[['funding_code', 'rating']].values, encoded_category))
# #     return df, features



# def preprocess(df):
#     # Map funding ranges to numerical codes
#     funding_map = {
#         '₹1L - ₹5L': 1,
#         '₹5L - ₹10L': 2,
#         '₹10L - ₹25L': 3,
#         '₹25L - ₹50L': 4,
#         '₹50L - ₹1Cr': 5,
#         '₹1Cr+': 6
#     }
#     df['funding_code'] = df['fundingneeds'].map(funding_map).fillna(0)
#     df['rating'] = pd.to_numeric(df['rating'], errors='coerce').fillna(0)

#     # One-hot encode 'category'
#     encoder = OneHotEncoder()
#     encoded_category = encoder.fit_transform(df[['category']].fillna("Unknown")).toarray()

#     # Priority weights
#     category_weight = 3.0     # Highest priority
#     funding_weight = 2.0
#     rating_weight = 1.0

#     # Scale/weight the features
#     funding_scaled = (df[['funding_code']] * funding_weight).values
#     rating_scaled = (df[['rating']] * rating_weight).values
#     category_scaled = encoded_category * category_weight

#     # Combine all weighted features
#     features = np.hstack((category_scaled, funding_scaled, rating_scaled))
#     return df, features


# # 🔍 Matchmaking based on cosine similarity
# def get_top_matches(user_id):
#     df = get_upload_data()
#     df, features = preprocess(df)

#     user_data = df[df['user_id'] == user_id]
#     if user_data.empty:
#         return []

#     latest_idx = user_data.index[-1]
#     user_vec = features[latest_idx].reshape(1, -1)

#     df['similarity'] = cosine_similarity(user_vec, features)[0]
#     df = df[df['user_id'] != user_id]

#     top_matches = df.sort_values(by='similarity', ascending=False).head(5)
#     return top_matches[['user_id', 'name', 'category', 'fundingneeds', 'sector', 'rating', 'similarity']]

# # 🚀 Cosine Similarity API
# @app.route('/api/recommendations/<int:user_id>', methods=['GET'])
# def recommend(user_id):
#     try:
#         results = get_top_matches(user_id)
#         if results is None or len(results) == 0:
#             return jsonify({"message": "No recommendations found"}), 404
#         return results.to_json(orient='records'), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # 📡 Startup Sector Matchmaking
# @app.route('/api/matchmaking/startup', methods=['GET'])
# def matchmaking_startup():
#     conn = get_db_connection()
#     if not conn:
#         return make_response(jsonify({"error": "Database connection failed"}), 500)

#     try:
#         with conn.cursor() as cur:
#             cur.execute("SELECT name, category, fundingneeds, sector FROM uploads WHERE sector = 'Startup';")
#             matches = cur.fetchall()
#     except Exception as e:
#         conn.rollback()
#         return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
#     finally:
#         conn.close()

#     formatted = [
#         {
#             "name": name,
#             "category": category,
#             "funding_range": funding,
#             "sector": sector
#         }
#         for name, category, funding, sector in matches
#     ]

#     return make_response(jsonify(formatted), 200)

# # 📡 Investor Sector Matchmaking
# @app.route('/api/matchmaking/investor', methods=['GET'])
# def matchmaking_investor():
#     conn = get_db_connection()
#     if not conn:
#         return make_response(jsonify({"error": "Database connection failed"}), 500)

#     try:
#         with conn.cursor() as cur:
#             cur.execute("""
#                 SELECT name, category, fundingneeds, sector, rating, user_id 
#                 FROM uploads 
#                 WHERE sector = 'Investor';
#             """)
#             matches = cur.fetchall()
#     except Exception as e:
#         conn.rollback()
#         return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
#     finally:
#         conn.close()

#     formatted = [
#         {
#             "name": name,
#             "category": category,
#             "funding_range": funding,
#             "sector": sector,
#             "rating": float(rating),
#             "user_id": user_id
#         }
#         for name, category, funding, sector, rating, user_id in matches
#     ]

#     return make_response(jsonify(formatted), 200)

# # 🆚 Compare Two Users
# @app.route('/api/compare/<int:user_id_1>/<int:user_id_2>', methods=['GET'])
# def compare_users(user_id_1, user_id_2):
#     try:
#         df = get_upload_data()
#         df, features = preprocess(df)

#         idx1 = df[df['user_id'] == user_id_1].index
#         idx2 = df[df['user_id'] == user_id_2].index

#         if idx1.empty or idx2.empty:
#             return jsonify({"error": "One or both user IDs not found"}), 404

#         vec1 = features[idx1[-1]].reshape(1, -1)
#         vec2 = features[idx2[-1]].reshape(1, -1)

#         similarity_score = cosine_similarity(vec1, vec2)[0][0]

#         return jsonify({
#             "user1_id": user_id_1,
#             "user2_id": user_id_2,
#             "similarity": round(similarity_score, 3),
#             "explanation": (
#                 "Users have a strong alignment in funding preferences and category"
#                 if similarity_score >= 0.8 else
#                 "Users have moderate to low alignment. Consider reviewing category and funding differences."
#             )
#         }), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
    
    
#     # ✅ Get current user's files
# @app.route('/api/files/<int:user_id>', methods=['GET'])
# def get_current_user_files(user_id):
#     conn = get_db_connection()
#     if not conn:
#         return jsonify({"error": "Database connection failed"}), 500

#     try:
#         with conn.cursor() as cur:
#             cur.execute("SELECT * FROM uploads WHERE user_id = %s", (user_id,))
#             rows = cur.fetchall()
#             columns = [desc[0] for desc in cur.description]
#             result = [dict(zip(columns, row)) for row in rows]
#             return jsonify(result), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         conn.close()

# # ✅ Get all other users' files
# @app.route('/api/files/others/<int:user_id>', methods=['GET'])
# def get_other_user_files(user_id):
#     conn = get_db_connection()
#     if not conn:
#         return jsonify({"error": "Database connection failed"}), 500

#     try:
#         with conn.cursor() as cur:
#             cur.execute("SELECT * FROM uploads WHERE user_id != %s", (user_id,))
#             rows = cur.fetchall()
#             columns = [desc[0] for desc in cur.description]
#             result = [dict(zip(columns, row)) for row in rows]
#             return jsonify(result), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
#     finally:
#         conn.close()




# # # Load CSV with 3000 Q&A
# # df = pd.read_csv("C:/Users/cheth/Downloads/venturelink_unique_3000_qa_dataset.csv")

# # @app.route("/chat", methods=["POST"])
# # def chat():
# #     try:
# #         data = request.get_json()
# #         question = data.get("question", "").strip().lower()

# #         # Case-insensitive match
# #         match = df[df["Question"].str.lower() == question]

# #         if not match.empty and "AI_Style_Answer" in match.columns:
# #             response = match.iloc[0]["AI_Style_Answer"]
# #         else:
# #             response = "Sorry, I don't have an answer for that question right now."

# #         return jsonify({"answer": response})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500



# # app = Flask(__name__)
# # CORS(app)  # Enable CORS for all routes

# LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"
# MODEL_NAME = "gemma-3-4b-it-qat"  # or "qwen2" or "meta-llama-3.1-8b-instruct"

# @app.route("/chat", methods=["POST"])
# def chat():
#     data = request.get_json()
#     user_input = data.get("message", "")

#     if not user_input:
#         return jsonify({"reply": "Please ask a valid question."}), 400

#     try:
#         payload = {
#             "model": MODEL_NAME,
#             "messages": [
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": user_input}
#             ],
#             "temperature": 0.7,
#             "max_tokens": 512
#         }

#         response = requests.post(LM_STUDIO_URL, json=payload)
#         response.raise_for_status()
#         result = response.json()
#         reply = result["choices"][0]["message"]["content"]

#         return jsonify({"reply": reply})

#     except Exception as e:
#         return jsonify({"reply": f"Error: {str(e)}"}), 500

# # MODEL_NAME = "gemma-3-4b-it-qat"
# # LM_STUDIO_URL = "http://localhost:8000/v1/chat/completions"  # adjust if different


# @app.route("/funding-scores", methods=["GET"])
# def funding_scores():
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()
#         cursor.execute("""
#             SELECT id, name, description, category, file_path, uploaded_at, sector, fundingneeds, rating, user_id, status
#             FROM public.uploads;
#         """)
#         rows = cursor.fetchall()
#         cursor.close()
#         conn.close()

#         startups = []
#         investors = []

#         for row in rows:
#             (
#                 id, name, description, category,
#                 file_path, uploaded_at, sector,
#                 fundingneeds, rating, user_id, status
#             ) = row

#             prompt = f"""
# You are a funding analyst. Analyze this profile and give a score from 1 to 10 with a reason.

# Name: {name}
# Sector: {sector}
# Category: {category}
# Funding Needs: {fundingneeds}
# Rating: {rating}
# Description: {description}

# Return format:
# Score: <1-10>
# Reason: <brief reason>
# """

#             payload = {
#                 "model": MODEL_NAME,
#                 "messages": [
#                     {"role": "system", "content": "You are a helpful funding assistant."},
#                     {"role": "user", "content": prompt.strip()}
#                 ],
#                 "temperature": 0.7,
#                 "max_tokens": 500
#             }

#             try:
#                 response = requests.post(LM_STUDIO_URL, json=payload, timeout=15)
#                 response.raise_for_status()
#                 ai_response = response.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()

#                 score_match = re.search(r"[Ss]core[:\s]*([0-9]{1,2})", ai_response)
#                 reason_match = re.search(r"[Rr]eason[:\s]*(.*)", ai_response)

#                 score = int(score_match.group(1)) if score_match else 0
#                 feedback = reason_match.group(1).strip() if reason_match else ai_response

#             except Exception as e:
#                 print(f"AI error for ID {id}: {str(e)}")
#                 score = 0
#                 feedback = "AI feedback unavailable."

#             result = {
#                 "id": id,
#                 "name": name,
#                 "category": category,
#                 "sector": sector,
#                 "funding_need": fundingneeds,
#                 "score": score,
#                 "feedback": feedback
#             }

#             # Separate based on sector value
#             if sector.lower() == "investor":
#                 investors.append(result)
#             else:
#                 startups.append(result)

#             time.sleep(1)  # Rate limit for stability

#         return jsonify({
#             "startups": startups,
#             "investors": investors
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
    
#     # 📰 Step 1: Fetch latest startup/funding/investment news
# def fetch_news():
#     url = "https://news.google.com/rss/search?q=startup+OR+funding+OR+investment&hl=en-IN&gl=IN&ceid=IN:en"
#     feed = feedparser.parse(url)
#     news_items = [entry['title'] + ". " + entry['summary'] for entry in feed.entries[:5]]
#     return news_items

# # 🤖 Step 2: Ask Gemma to summarize using LM Studio
# def summarize_news(news_items):
#     prompt = "Summarize the top startup and funding news headlines:\n\n" + "\n\n".join(news_items)

#     payload = {
#         "model": "gemma",
#         "messages": [{"role": "user", "content": prompt}],
#         "temperature": 0.7,
#         "max_tokens": 512
#     }

#     try:
#         response = requests.post("http://localhost:1234/v1/chat", json=payload)
#         response.raise_for_status()
#         return response.json()["choices"][0]["message"]["content"]
#     except Exception as e:
#         return f"Error from LM Studio: {str(e)}"

# # 🌐 Step 3: API route to serve summarized news
# @app.route('/ai-news', methods=['GET'])
# def ai_news():
#     try:
#         raw_news = fetch_news()
#         summary = summarize_news(raw_news)
#         return jsonify({"summary": summary})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # 🔁 Optional: Root route
# @app.route('/')
# def home():
#     return "✅ VentureLink AI News API is running."

# # 🏁 Run server
# if __name__ == '__main__':
#     app.run(debug=True, port=8000)


from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import psycopg2
import pandas as pd
import os
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity
import requests
import time
import re
import feedparser  # Added missing import for news functionality
import base64  # Added for base64 encoding/decoding

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="Venturelink_db",
            user="postgres",
            password="root"
        )
        conn.autocommit = True
        return conn
    except Exception as e:
        print(f"DB connection error: {e}")
        return None

# Load Uploads Data
def get_upload_data():
    conn = get_db_connection()
    df = pd.read_sql("SELECT * FROM uploads", conn)
    conn.close()
    return df

def preprocess(df):
    funding_map = {
        '₹1L - ₹5L': 1,
        '₹5L - ₹10L': 2,
        '₹10L - ₹25L': 3,
        '₹25L - ₹50L': 4,
        '₹50L - ₹1Cr': 5,
        '₹1Cr+': 6
    }
    df['funding_code'] = df['fundingneeds'].map(funding_map).fillna(0)
    df['rating'] = pd.to_numeric(df['rating'], errors='coerce').fillna(0)

    encoder = OneHotEncoder()
    encoded_category = encoder.fit_transform(df[['category']].fillna("Unknown")).toarray()

    category_weight = 3.0
    funding_weight = 2.0
    rating_weight = 1.0

    funding_scaled = (df[['funding_code']] * funding_weight).values
    rating_scaled = (df[['rating']] * rating_weight).values
    category_scaled = encoded_category * category_weight

    features = np.hstack((category_scaled, funding_scaled, rating_scaled))
    return df, features

def get_top_matches(user_id):
    df = get_upload_data()
    df, features = preprocess(df)

    user_data = df[df['user_id'] == user_id]
    if user_data.empty:
        return []

    latest_idx = user_data.index[-1]
    user_vec = features[latest_idx].reshape(1, -1)

    df['similarity'] = cosine_similarity(user_vec, features)[0]
    df = df[df['user_id'] != user_id]

    top_matches = df.sort_values(by='similarity', ascending=False).head(5)
    return top_matches[['user_id', 'name', 'category', 'fundingneeds', 'sector', 'rating', 'similarity']]

@app.route('/api/recommendations/<int:user_id>', methods=['GET'])
def recommend(user_id):
    try:
        results = get_top_matches(user_id)
        if results is None or len(results) == 0:
            return jsonify({"message": "No recommendations found"}), 404
        return results.to_json(orient='records'), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/matchmaking/startup', methods=['GET'])
def matchmaking_startup():
    conn = get_db_connection()
    if not conn:
        return make_response(jsonify({"error": "Database connection failed"}), 500)

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT name, category, fundingneeds, sector FROM uploads WHERE sector = 'Startup';")
            matches = cur.fetchall()
    except Exception as e:
        conn.rollback()
        return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
    finally:
        conn.close()

    formatted = [
        {
            "name": name,
            "category": category,
            "funding_range": funding,
            "sector": sector
        }
        for name, category, funding, sector in matches
    ]

    return make_response(jsonify(formatted), 200)

@app.route('/api/matchmaking/investor', methods=['GET'])
def matchmaking_investor():
    conn = get_db_connection()
    if not conn:
        return make_response(jsonify({"error": "Database connection failed"}), 500)

    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT name, category, fundingneeds, sector, rating, user_id 
                FROM uploads 
                WHERE sector = 'Investor';
            """)
            matches = cur.fetchall()
    except Exception as e:
        conn.rollback()
        return make_response(jsonify({"error": f"Database query failed: {e}"}), 500)
    finally:
        conn.close()

    formatted = [
        {
            "name": name,
            "category": category,
            "funding_range": funding,
            "sector": sector,
            "rating": float(rating),
            "user_id": user_id
        }
        for name, category, funding, sector, rating, user_id in matches
    ]

    return make_response(jsonify(formatted), 200)

@app.route('/api/compare/<int:user_id_1>/<int:user_id_2>', methods=['GET'])
def compare_users(user_id_1, user_id_2):
    try:
        df = get_upload_data()
        df, features = preprocess(df)

        idx1 = df[df['user_id'] == user_id_1].index
        idx2 = df[df['user_id'] == user_id_2].index

        if idx1.empty or idx2.empty:
            return jsonify({"error": "One or both user IDs not found"}), 404

        vec1 = features[idx1[-1]].reshape(1, -1)
        vec2 = features[idx2[-1]].reshape(1, -1)

        similarity_score = cosine_similarity(vec1, vec2)[0][0]

        return jsonify({
            "user1_id": user_id_1,
            "user2_id": user_id_2,
            "similarity": round(similarity_score, 3),
            "explanation": (
                "Users have a strong alignment in funding preferences and category"
                if similarity_score >= 0.8 else
                "Users have moderate to low alignment. Consider reviewing category and funding differences."
            )
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/files/<int:user_id>', methods=['GET'])
def get_current_user_files(user_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM uploads WHERE user_id = %s", (user_id,))
            rows = cur.fetchall()
            columns = [desc[0] for desc in cur.description]
            result = [dict(zip(columns, row)) for row in rows]
            return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/files/others/<int:user_id>', methods=['GET'])
def get_other_user_files(user_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM uploads WHERE user_id != %s", (user_id,))
            rows = cur.fetchall()
            columns = [desc[0] for desc in cur.description]
            result = [dict(zip(columns, row)) for row in rows]
            return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

LM_STUDIO_URL = "http://localhost:1234/v1/chat/completions"
MODEL_NAME = "gemma-3-4b-it-qat"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"reply": "Please ask a valid question."}), 400

    try:
        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ],
            "temperature": 0.7,
            "max_tokens": 512
        }

        response = requests.post(LM_STUDIO_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

@app.route("/funding-scores", methods=["GET"])
def funding_scores():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, name, description, category, file_path, uploaded_at, sector, fundingneeds, rating, user_id, status
            FROM public.uploads;
        """)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        startups = []
        investors = []

        for row in rows:
            (
                id, name, description, category,
                file_path, uploaded_at, sector,
                fundingneeds, rating, user_id, status
            ) = row

            prompt = f"""
You are a funding analyst. Analyze this profile and give a score from 1 to 10 with a reason.

Name: {name}
Sector: {sector}
Category: {category}
Funding Needs: {fundingneeds}
Rating: {rating}
Description: {description}

Return format:
Score: <1-10>
Reason: <brief reason>
"""

            payload = {
                "model": MODEL_NAME,
                "messages": [
                    {"role": "system", "content": "You are a helpful funding assistant."},
                    {"role": "user", "content": prompt.strip()}
                ],
                "temperature": 0.7,
                "max_tokens": 500
            }

            try:
                response = requests.post(LM_STUDIO_URL, json=payload, timeout=15)
                response.raise_for_status()
                ai_response = response.json().get("choices", [{}])[0].get("message", {}).get("content", "").strip()

                score_match = re.search(r"[Ss]core[:\s]*([0-9]{1,2})", ai_response)
                reason_match = re.search(r"[Rr]eason[:\s]*(.*)", ai_response)

                score = int(score_match.group(1)) if score_match else 0
                feedback = reason_match.group(1).strip() if reason_match else ai_response

            except Exception as e:
                print(f"AI error for ID {id}: {str(e)}")
                score = 0
                feedback = "AI feedback unavailable."

            result = {
                "id": id,
                "name": name,
                "category": category,
                "sector": sector,
                "funding_need": fundingneeds,
                "score": score,
                "feedback": feedback
            }

            if sector.lower() == "investor":
                investors.append(result)
            else:
                startups.append(result)

            time.sleep(1)

        return jsonify({
            "startups": startups,
            "investors": investors
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Hardcode your Hugging Face token here
HF_TOKEN = "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"

def fetch_news():
    rss_url = "https://news.google.com/rss/search?q=startup+funding+investment&hl=en-IN&gl=IN&ceid=IN:en"
    feed = feedparser.parse(rss_url)
    return [entry['title'] + ". " + entry.get('summary', '') for entry in feed.entries[:3]]

def summarize_news(news_items):
    prompt = "Summarize these startup and funding news headlines:\n\n" + "\n\n".join(news_items)
    payload = {
        "model": "gemma",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 512
    }
    try:
        response = requests.post("http://localhost:1234/v1/chat/completions", json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error from LM Studio: {e}"

def generate_image(prompt):
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}"
    }
    data = {
        "inputs": prompt
    }
    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
            headers=headers,
            json=data
        )
        if response.status_code == 200:
            return base64.b64encode(response.content).decode("utf-8")
        else:
            print("Image generation failed:", response.status_code, response.text)
            return None
    except Exception as e:
        print("Image generation error:", e)
        return None

@app.route("/ai-news", methods=["GET"])
def ai_news():
    news_items = fetch_news()
    summary = summarize_news(news_items)
    image_b64 = generate_image("Startup funding futuristic digital concept")
    return jsonify({
        "summary": summary,
        "image": image_b64
    })

@app.route("/")
def home():
    return "✅ VentureLink AI News Backend Running"
if __name__ == '__main__':
    app.run(debug=True, port=8000)