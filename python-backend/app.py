from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Python!"})

@app.route('/api/image/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Here you would typically save the file to a directory or process it
    # For this example, we will just return a success message
    return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200@app.route('/api/chatgpt', methods=['GET'])

def chatgpt():
    return jsonify({
        "can_be_recycled": "yes",
        "details": "This is a hot dog.",
        "where": "1290 Parkmoor Ave, San Jose, CA 95126",
    }
)

if __name__ == '__main__':
    app.run(debug=True)
