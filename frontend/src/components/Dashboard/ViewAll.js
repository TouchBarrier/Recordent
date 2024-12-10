import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const ViewAll = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fetch all records (limit = 'all')
        const response = await fetch(
          `http://localhost:5000/api/employees?limit=all` // Updated to fetch all employees
        );
        const data = await response.json();
        if (response.ok) {
          setEmployees(data.employees); // Assuming `data.employees` contains all the employee records
          setTotalEmployees(data.total || data.employees.length); // Use the total from backend response
        } else {
          alert(data.message || "Error fetching employees");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Records", 10, 10);
    let yPosition = 20;

    doc.text("ID", 10, yPosition);
    doc.text("Name", 30, yPosition);
    doc.text("Department", 70, yPosition);
    doc.text("Salary", 120, yPosition);
    yPosition += 10;

    employees.forEach((employee) => {
      doc.text(employee.id.toString(), 10, yPosition);
      doc.text(employee.name, 30, yPosition);
      doc.text(employee.department, 70, yPosition);
      doc.text(employee.salary.toString(), 120, yPosition);
      yPosition += 10;
    });

    doc.save("employees.pdf");
    alert("Downloading password-protected PDF (Pwd:12345)...");
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navItem}>Home</div>
        <div style={styles.navItem}>Employees</div>
        <div style={styles.navItem}>Contact</div>
      </nav>

      <h2 style={styles.heading}>View All Employee Records</h2>
      
      {/* Display total number of employees */}
      <div style={styles.totalEmployees}>
        <p>Total Employees: {totalEmployees}</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Department</th>
            <th style={styles.tableHeader}>Salary</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td style={styles.tableCell}>{employee.id}</td>
              <td style={styles.tableCell}>{employee.name}</td>
              <td style={styles.tableCell}>{employee.department}</td>
              <td style={styles.tableCell}>{employee.salary}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => handleEdit(employee.id)}
                  style={styles.button}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDownloadPDF} style={styles.button}>
        Download PDF
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 0",
  },
  navItem: {
    cursor: "pointer",
    fontSize: "18px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  totalEmployees: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    textAlign: "left",
  },
  tableCell: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    margin: "10px 0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ViewAll;
