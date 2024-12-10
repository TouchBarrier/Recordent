import React, { useState } from "react";


const NewRecord = () => {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Backend Error:', data);
        alert(data.message || 'Error adding employee');
      } else {
        alert('Employee added successfully!');
        setEmployee({ name: '', department: '', salary: '' });
      }
    } catch (error) {
      console.error('Request Error:', error);
      alert('Error connecting to the backend');
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default NewRecord;
