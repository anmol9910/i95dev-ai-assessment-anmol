

import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

try:
    
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
except Exception as e:
    print(f"Error initializing Groq client: {e}")
    client = None

def generate_recommendations_with_llm(user_preferences, product_catalog):
    if not client:
        return {"error": "Groq client is not initialized. Check your API key."}

    product_list_str = "\n".join([f"- ID: {p['id']}, Name: {p['name']}, Category: {p['category']}, Price: ${p['price']}, Tags: {', '.join(p['tags'])}" for p in product_catalog])
    
    prompt = f"""
    You are an expert eCommerce Personal Shopper AI. Your goal is to provide personalized product recommendations.

    Here is the list of available products:
    --- START OF PRODUCT CATALOG ---
    {product_list_str}
    --- END OF PRODUCT CATALOG ---

    Here are the user's preferences and browsing history:
    --- START OF USER DATA ---
    {user_preferences}
    --- END OF USER DATA ---

    Based on the user's data and the available products, please recommend up to 3 products.
    For each recommended product, provide its ID and a short, compelling reason (one sentence) explaining why it's a good fit for the user.
    
    IMPORTANT: Your response MUST be a valid JSON object containing a key "recommendations" which holds an array of objects. Do not add any text before or after the JSON.
    The format should be:
    {{
      "recommendations": [
        {{
          "product_id": "some_product_id",
          "reason": "This is a great fit because..."
        }}
      ]
    }}
    """

    try:
        response = client.chat.completions.create(
            
            # --- YAHAN HUMNE DOCUMENTATION SE NAYA AUR 100% WORKING MODEL USE KIYA HAI ---
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        recommendations_str = response.choices[0].message.content
        recommendations_data = json.loads(recommendations_str)
        
        return recommendations_data.get("recommendations", [])

    except Exception as e:
        
        print(f"An error occurred while calling Groq API: {e}")
        return {"error": f"Failed to generate recommendations. Error: {e}"}

