# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

from services.product_service import get_all_products
from services.llm_service import generate_recommendations_with_llm

app = Flask(__name__)
CORS(app)

@app.route('/api/products', methods=['GET'])
def list_products():
    products = get_all_products()
    return jsonify(products)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    user_data = request.get_json()
    if not user_data:
        return jsonify({"error": "No data provided"}), 400

    user_preferences = user_data.get('preferences', '')
    # 1. Frontend se history ka data nikalein
    browsing_history_ids = user_data.get('history', [])
    
    product_catalog = get_all_products()

    # 2. History IDs ke basis par poore product details nikalein
    history_products = [p for p in product_catalog if p['id'] in browsing_history_ids]
    history_text = "User has recently viewed these items: " + ", ".join([p['name'] for p in history_products])
    
    # 3. User ki pasand aur history ko ek saath jod dein
    full_user_context = f"User Preferences: {user_preferences}\n{history_text if history_products else ''}"

    recommendations = generate_recommendations_with_llm(full_user_context, product_catalog)
    
    return jsonify(recommendations)

@app.route('/')
def index():
    return "Flask Backend for AI Recommendation Engine is running!"

if __name__ == '__main__':
    app.run(debug=True, port=5000)