import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = () => {
    // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  const uploadImage = async (image) => {
    // Function to handle image upload
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Make a POST request to the Flask backend to upload the image
      const response = await axios.post('http://api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
    }
    catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Return the JSX for rendering
  return (
    <div>
      {/* Header */}
      <h1>Upload and Display Image</h1>

      {/* Conditionally render the selected image if it exists */}
      {selectedImage && (
        <div>
          {/* Display the selected image */}
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          {/* Button to remove the selected image */}

          <button onClick={() => setSelectedImage(null)}>Remove</button>
          <button
            onClick={() => {
              uploadImage(selectedImage); // Call the upload function with the selected image
            }}>Upload</button>
        </div>
      )}

      <br />

      {/* Input element to select an image file */}
      {!selectedImage && (<input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          console.log(event.target.files[0]); // Log the selected file
          setSelectedImage(event.target.files[0]); // Update the state with the selected file
        }}
      />)}
    </div>
  );
};

export default Upload;