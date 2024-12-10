import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import useIdleTimeout from '../../useIdleTimeout';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [totalEmployees, setTotalEmployees] = useState(0); // State for total employees
  const [viewAllClicked, setViewAllClicked] = useState(false); // State to track "View All" button click

  useIdleTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = '/signin'; 
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(response.data);
        setTotalEmployees(response.data.length); // Set total number of employees
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Function to fetch all employees when "View All" button is clicked
  const fetchAllEmployees = async () => {
    setLoading(true); // Show loading while fetching all employees
    try {
      const response = await axios.get('http://localhost:5000/api/employees/all', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(response.data);
      setViewAllClicked(true); // Mark that "View All" is clicked
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all employees:", error);
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('No file selected!');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/bulk-upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message || 'File uploaded successfully!');
      setSelectedFile(null); 
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('Failed to upload file');
    }
  };

  return (
    <div style={styles.dashboard}>
      <Navbar />
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>Welcome to the Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <EmployeeTable employees={employees} />
            <p>Total Employees: {totalEmployees}</p>
            {!viewAllClicked && (
              <button onClick={fetchAllEmployees} style={styles.viewAllButton}>
                View All Employees
              </button>
            )}
          </>
        )}

        <div style={styles.bulkUploadCard}>
          <h2>Bulk Upload</h2>
          <input 
            type="file" 
            onChange={handleFileSelect} 
            style={styles.fileInput} 
          />
          <button onClick={handleFileUpload} style={styles.uploadButton}>Upload</button>
          {uploadMessage && <p style={styles.uploadMessage}>{uploadMessage}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#F0F4F8',
    minHeight: '100vh',
  },
  mainContent: {
    margin: '30px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  bulkUploadCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '60%',
    margin: '0 auto',
    marginTop: '30px',
  },
  fileInput: {
    padding: '12px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',  // Green for upload
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    marginTop: '15px',
  },
  uploadMessage: {
    color: '#F44336',
    marginTop: '15px',
  },
  viewAllButton: {
    backgroundColor: '#2196F3',  // Blue for View All button
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

function EmployeeTable({ employees }) {
  const tableStyle = {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const thStyle = {
    backgroundColor: '#3E4A89',
    color: 'white',
    padding: '12px 20px',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '12px 20px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Department</th>
          <th style={thStyle}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td style={tdStyle}>{employee.name}</td>
            <td style={tdStyle}>{employee.department}</td>
            <td style={tdStyle}>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Dashboard;
