import React, { useState } from "react";
import axios from 'axios'; 

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]); 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data.employees); 
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post('http://localhost:5000/api/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      alert("File uploaded successfully!");

     
      fetchEmployees();

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bulk Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      
      <div>
        <h3>Employee List</h3>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>{employee.name} - {employee.department} - {employee.salary}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BulkUpload;
