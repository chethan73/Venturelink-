from flask import Flask
from flask_cors import CORS
from app.smart_bot import smart_bot  # ✅ import blueprint

def create_app():
    app = Flask(__name__)
    # Enable CORS only for your frontend origin
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    
    app.register_blueprint(smart_bot)  # ✅ register the blueprint
    return app
