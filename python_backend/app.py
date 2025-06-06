import ast

from flask import Flask, jsonify, request
from flask_cors import CORS

from PIL import Image
import io

import matplotlib.pyplot as plt
import numpy as np

# import ai.main
# import ai.apikeys

image = None
print("Starting Python backend...")
app = Flask(__name__)
CORS(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})


@app.route('/api/image/upload', methods=['POST'])
def upload_image():
    print("Received request to upload image.")
    
    if 'image' not in request.files:
        print("No file part in the request.")
        return jsonify({"error": "No file part"}), 400

    file = request.files['image']
    print(f"Received file: {file.filename}")

    if file.filename == '':
        print("No file selected for upload.")
        return jsonify({"error": "No selected file"}), 400
    else:
        # Read the image and print its format and size
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        image.show()  # This will display the image in a window (if running locally)
        print(f"Image format: {image.format}")
        print(f"Image size: {image.size}")
        # Optionally, show the image (will open a window on the server)
        # image.show()

    # Return the URL to access the uploaded image
    return jsonify({
        "message": "File uploaded successfully",
        "filename": file.filename,
        "url": f"/api/uploads/{file.filename}"
    }), 200


@app.route('/api/chatgpt', methods=['GET'])
def chatgpt():
    data = ast.literal_eval(ai.main.call_gpt(ai.main.prompts))
    data['where'] = {
        "street_address": '1290 Parkmoor Ave',
        "city": "San Jose",
        "zip": 95126,
        "state": "CA",
        "name": "BASIS Independent Silicon Valley"
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=5050)
    

