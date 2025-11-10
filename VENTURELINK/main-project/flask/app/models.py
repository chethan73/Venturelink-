from app import db

class Upload(db.Model):
    __tablename__ = 'uploads'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    funding_range = db.Column(db.String(50), nullable=False)  # E.g., '₹1L - ₹5L'

    def __init__(self, name, description, category, funding_range):
        self.name = name
        self.description = description
        self.category = category
        self.funding_range = funding_range
