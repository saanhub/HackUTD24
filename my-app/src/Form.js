import React, { useState, useRef } from "react";
import "./Form.css";
import Upload from "./upload.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";



  // Handle submit to navigate to Graph.js

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    // You can perform other logic here (e.g., form validation) before navigating
    navigate("/graph");  // Navigate to the Graph page
  }; 


  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  // Trigger file input click
  const handleBoxClick = () => {
    inputRef.current.click();
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload the file.");
      }
    } else {
      alert("No file selected. Please choose a PDF file to upload.");
    }
  };

  return (
    <div className="Form">
      <div className="Form-Purple-container"></div>
      <div className="EmployeeID-container">
        <h1 className="EmployeeID-text">Employee ID</h1>
      </div>

      {/* Text Field 1 */}
      <div className="Custom-InputContainer">
        <input
          type="text"
          id="employee-id"
          name="employee-id"
          className="Custom-TextField"
          placeholder="Enter your 4 digit ID"
        />
      </div>

      <div className="Well-container">
        <h1 className="Well-text">Well Name</h1>
      </div>

      {/* Text Field 2 */}
      <div className="Well-InputContainer">
        <input
          type="text"
          id="well-name"
          name="well-id"
          className="Custom-TextField"
          placeholder="Enter the well name"
        />
      </div>

      <div className="Upload-container">
        <h1 className="Upload-text">Upload Data</h1>
      </div>

      {/* Clickable Upload Box */}
      <div className="Form-upload-box" onClick={handleBoxClick}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
        {selectedFile && (
          <p className="SelectedFileText">Selected file: {selectedFile.name}</p>
        )}
        <button onClick={handleUpload} className="Custom-UploadButton">
          Upload PDF
        </button>
      </div>

      <div
        className="Upload-image-background"
        style={{ background: `url(${Upload}) 50% / cover no-repeat` }}
      ></div>

      <div className="Custom-submit-ButtonContainer">
        <button onClick={handleSubmit} className="Custom-submit-Button">Submit</button>
      </div>
    </div>
  );
}

export default Form;
