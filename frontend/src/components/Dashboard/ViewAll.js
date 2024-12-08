import React, { useState, useEffect } from "react";

const ViewAll = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    // Fetch data from the backend
    const fetchEmployees = async () => {
      // Replace with your API call
      const mockData = [
        { id: 1, name: "John", department: "HR", salary: 50000 },
        { id: 2, name: "Doe", department: "IT", salary: 60000 },
        { id: 3, name: "Jane", department: "Finance", salary: 55000 },
      ];
      setEmployees(mockData);
    };
    fetchEmployees();
  }, []);

  const handleDownloadPDF = () => {
    alert("Downloading password-protected PDF (Pwd:12345)...");
    // Call backend API to generate and download the PDF
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
    // Redirect or open a modal for editing
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div style={{ padding: "20px" }}>
      <h2>View All Records</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(employees.length / recordsPerPage)
                ? prev + 1
                : prev
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewAll;
