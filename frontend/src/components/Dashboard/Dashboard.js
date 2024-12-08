// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useIdleTimeout from '../../useIdleTimeout';
import './dashboard.css';



function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle session expiration on idle timeout
  useIdleTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = '/signin'; // Redirect to Signin page on timeout
  });

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Logout function to remove token and redirect to sign-in page
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin'; // Redirect to sign-in page
  };

  return (
    <div>
      <nav>
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <Link to="/new-record">New Record</Link>
            <Link to="/view-all">View All</Link>
            <Link to="/bulk-upload">Bulk Upload</Link>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <h1>Welcome to the Dashboard</h1>
      {loading ? <p>Loading...</p> : <EmployeeTable employees={employees} />}
    </div>
  );
}

function EmployeeTable({ employees }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Dashboard;
