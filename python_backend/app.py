import ast
import base64

from flask import Flask, jsonify, request
from flask_cors import CORS

import ai.main
import ai.apikeys

image = None
print("Starting Python backend...")
app = Flask(__name__)
CORS(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})

@app.route('/api/chatgpt/data', methods=['GET'])
def check_image():
    global image
    return jsonify(image)


@app.route('/api/image/upload', methods=['POST'])
def upload_image():
    global image
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
        print(f"File selected for upload: {file.filename}")
        image = base64.b64encode(file.read()).decode()  
    # Return the URL to access the uploaded image
    return jsonify({
        "message": "File uploaded successfully",
        "filename": file.filename,
        "url": f"/api/uploads/{file.filename}"
    }), 200


@app.route('/api/chatgpt', methods=['GET'])
def chatgpt():
    global image
    data = ast.literal_eval(ai.main.call_gpt(ai.main.generate_prompts(image)))
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
    

