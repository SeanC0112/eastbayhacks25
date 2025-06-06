import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = () => {
    // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const uploadImage = async (image) => {
    // Function to handle image upload]
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Make a POST request to the Flask backend to upload the image
      const response = await axios.post('http://api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

        setUploaded(true);
      console.log('Image uploaded successfully:', response.data);
    }
    catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Return the JSX for rendering
  return (
    <div style={{
      maxWidth: 350,
      margin: "40px auto",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      background: "#fff",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#1976d2", marginBottom: 24 }}>Upload and Display Image</h1>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width="250px"
            src={URL.createObjectURL(selectedImage)}
            style={{
              borderRadius: 8,
              boxShadow: "0 1px 8px rgba(0,0,0,0.10)",
              marginBottom: 16
            }}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12 }}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: "none",
                background: "#e0e0e0",
                color: "#333",
                cursor: "pointer"
              }}
            >Remove</button>
            <button
              onClick={() => uploadImage(selectedImage)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: "none",
                background: "#1976d2",
                color: "#fff",
                cursor: "pointer"
              }}
            >Upload</button>
          </div>
        </div>
      )}
        {uploaded && (<h1 style={{ color: "#4caf50", marginTop: 16 }}>Image Uploaded Successfully!</h1>)}

      {!selectedImage && (
        <div style={{ marginTop: 32 }}>
          <label
            htmlFor="file-upload"
            style={{
              display: "inline-block",
              padding: "10px 24px",
              borderRadius: 6,
              background: "#1976d2",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 1px 6px rgba(25, 118, 210, 0.08)",
              transition: "background 0.2s"
            }}
          >
            Choose Image
            <input
              id="file-upload"
              type="file"
              name="myImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Upload;