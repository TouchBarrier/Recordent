const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const pdfkit = require('pdfkit');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

// Mock employee data for demonstration
let employees = [
  { id: 1, name: 'John Doe', department: 'HR', salary: 5000 },
  { id: 2, name: 'Jane Smith', department: 'Engineering', salary: 6000 },
];

// Route to get all employees
app.get('/api/employees', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    res.json(employees);
  });
});

// Route to generate PDF (protected with password)
app.get('/api/download-pdf', (req, res) => {
  const password = req.query.password;
  if (password !== '12345') {
    return res.status(403).json({ message: 'Forbidden: Incorrect password' });
  }

  const doc = new pdfkit();
  res.setHeader('Content-disposition', 'attachment; filename=employees.pdf');
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  doc.text('Employee Records');
  employees.forEach((employee) => {
    doc.text(`Name: ${employee.name}, Department: ${employee.department}, Salary: ${employee.salary}`);
  });
  doc.end();
});

// Route for bulk upload (Excel)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload-excel', upload.single('file'), (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet_name_list = workbook.SheetNames;
  const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  employees = [...employees, ...xlData];
  res.status(200).json({ message: 'Bulk upload successful' });
});

// Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
