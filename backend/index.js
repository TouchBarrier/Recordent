// index.js (Node.js backend)
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const multer = require('multer');
const ExcelJS = require('exceljs');

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],       
  allowedHeaders: ['Content-Type'], 
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use((req, res, next) => {
  console.log(req.body); 
  next();
});

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sweety@143', 
  database: 'recordant',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// SignUp Route
app.post('/api/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingUser] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          return reject(err);
        }
        resolve(result);
      });
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error('Database insertion error:', err);
            return reject(err);
          }
          resolve(result);
        }
      );
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  console.log('Received sign-in request:', { email });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('User logged in successfully:', email);
    res.status(200).json({ message: 'Login successful', token });
  });
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/bulk-upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1); 

    const employeeData = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const [name, department, salary] = row.values.slice(1);
        if (name && department && salary) {
          employeeData.push({ name, department, salary });
        }
      }
    });

    
    const sql = 'INSERT INTO employees (name, department, salary) VALUES ?';
    const values = employeeData.map(emp => [emp.name, emp.department, emp.salary]);
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting records:', err);
        return res.status(500).json({ message: 'Error inserting records' });
      }
      res.status(200).json({ message: `${result.affectedRows} records inserted successfully` });
    });

  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ message: 'Error processing file' });
  }
});

// newRecord
app.post('/api/employees', (req, res) => {
  const { name, department, salary } = req.body;

  if (!name || !department || !salary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)';
  db.query(sql, [name, department, salary], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      return res.status(500).json({ message: 'Error inserting employee' });
    }
    res.status(201).json({ message: 'Employee added successfully' });
  });
});

// ViewAll 
app.get('/api/employees', (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  // Check if the client wants all records, for example if limit is set to 'all'
  if (limit === 'all') {
    const sql = 'SELECT * FROM employees'; // Fetch all employees without limit
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).json({ message: 'Error fetching employees' });
      }
      res.status(200).json({ employees: results, total: results.length });
    });
  } else {
    // Fetch records with pagination
    const sql = 'SELECT * FROM employees LIMIT ?, ?';
    db.query(sql, [parseInt(offset), parseInt(limit)], (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).json({ message: 'Error fetching employees' });
      }
      const countSql = 'SELECT COUNT(*) AS total FROM employees';
      db.query(countSql, (err, countResults) => {
        if (err) {
          console.error('Error fetching total count:', err);
          return res.status(500).json({ message: 'Error fetching total count' });
        }
        res.status(200).json({ employees: results, total: countResults[0].total });
      });
    });
  }
});




// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
