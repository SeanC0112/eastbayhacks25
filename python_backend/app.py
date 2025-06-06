from flask import Flask, jsonify, request
from flask_cors import CORS

from .AI import ai, apikeys


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
    
    file = request.form['image']
    
    if file.filename == '':
        print("No file selected for upload.")
        return jsonify({"error": "No selected file"}), 400
    else:
        image = file.read()
        print("Image received:", image)
        # Here you would typically process the image with your AI model
    
    # Here you would typically save the file to a directory or process it
    # For this example, we will just return a success message
    return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200


@app.route('/api/chatgpt', methods=['GET'])
def chatgpt():
    AI.ai.call_gpt(AI)
    return jsonify({
        "status": "compost",
        "details": "This is a hot dog.",
        "where": {
            "street_address": '1290 Parkmoor Ave',
            "city": "San Jose",
            "zip": 95126,
            "state": "CA",
            "name": "BASIS Independent Silicon Valley"
        }
    })


if __name__ == '__main__':
    app.run(debug=True)

