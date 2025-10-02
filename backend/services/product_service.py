# backend/services/product_service.py

import json
import os

# products.json file ka path dynamically generate karein
# __file__ se current file ka path milta hai, os.path.dirname se directory, aur .. se ek level upar
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
product_file_path = os.path.join(base_dir, 'data', 'products.json')

def get_all_products():
    """
    products.json file se saare products load karta hai aur return karta hai.
    """
    try:
        with open(product_file_path, 'r') as f:
            products = json.load(f)
        return products
    except FileNotFoundError:
        print(f"Error: The file at {product_file_path} was not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from the file at {product_file_path}.")
        return []