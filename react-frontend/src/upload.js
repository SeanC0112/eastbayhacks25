import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:5050/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploaded(true);
      setUploadedUrl('http://127.0.0.1:5050' + response.data.url);
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      minWidth: 320,
      margin: "0 auto",
      padding: 32,
      borderRadius: 18,
      boxShadow: "0 4px 24px rgba(25,118,210,0.10)",
      background: "#fff",
      textAlign: "center",
      border: "2px solid #43e97b22"
    }}>
      <h1 style={{ color: "#1976d2", marginBottom: 24, fontWeight: 700, fontSize: 28 }}>Upload and Display Image</h1>

      <style>
        {`
          .custom-btn:active {
            filter: brightness(0.85);
          }
        `}
      </style>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width="250px"
            src={URL.createObjectURL(selectedImage)}
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(67,233,123,0.10)",
              marginBottom: 16,
              border: "2px solid #43e97b55"
            }}
          />
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <button
              className="custom-btn"
              onClick={() => {
                setSelectedImage(null);
                setUploaded(false);
                setUploadedUrl(null);
              }}
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                border: "none",
                background: "#e0e0e0",
                color: "#1976d2",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >Remove</button>
            <button
              className="custom-btn"
              onClick={() => uploadImage(selectedImage)}
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(90deg, #1976d2 0%, #43e97b 100%)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(67,233,123,0.10)",
                transition: "background 0.2s"
              }}
            >Upload</button>
          </div>
        </div>
      )}
      {uploaded && uploadedUrl && (
        <div>
          <h2 style={{ color: "#43e97b", marginTop: 24, fontWeight: 700 }}>Image Uploaded Successfully!</h2>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            width="250px"
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(67,233,123,0.10)",
              marginTop: 16,
              border: "2px solid #1976d255"
            }}
          />
        </div>
      )}

      {!selectedImage && (
        <div style={{ marginTop: 32 }}>
          <label
            htmlFor="file-upload"
            className="custom-btn"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              borderRadius: 8,
              background: "linear-gradient(90deg, #1976d2 0%, #43e97b 100%)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.10)",
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
                setUploaded(false);
                setUploadedUrl(null);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Upload;
