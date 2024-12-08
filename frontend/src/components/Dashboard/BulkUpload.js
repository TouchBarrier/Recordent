import React, { useState } from "react";

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Send file to backend
    console.log("Uploading file:", file.name);
    alert("File uploaded successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bulk Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default BulkUpload;
