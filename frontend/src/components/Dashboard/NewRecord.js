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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send employee data to the backend (e.g., via Axios)
    console.log("Employee Added: ", employee);
    alert("Employee added successfully!");
    setEmployee({ name: "", department: "", salary: "" });
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
