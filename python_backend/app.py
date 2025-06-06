import ast

from flask import Flask, jsonify, request
from flask_cors import CORS

import AI.main
import AI.apikeys

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
    
    if file.filename == '':
        print("No file selected for upload.")
        return jsonify({"error": "No selected file"}), 400
    else:
        image = file.read()
        print("Image received:", len(image), "bytes")
        # Here you would typically process the image with your AI model
    
    # Here you would typically save the file to a directory or process it
    # For this example, we will just return a success message
    return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200


@app.route('/api/chatgpt', methods=['GET'])
def chatgpt():
    data = ast.literal_eval(AI.main.call_gpt(AI.main.prompts))
    data['where'] = {
        "street_address": '1290 Parkmoor Ave',
        "city": "San Jose",
        "zip": 95126,
        "state": "CA",
        "name": "BASIS Independent Silicon Valley"
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

