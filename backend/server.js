const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

const path = require('path');

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Edlineveremu@2025',
  database: 'clinic'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Routes

// Add new patient
app.post('/patients', (req, res) => {
  const { name, age, height } = req.body;
  const query = 'INSERT INTO patients (name, age, height) VALUES (?, ?, ?)';
  db.query(query, [name, age, height], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Patient added', patientId: result.insertId });
  });
});

// Add visit for a patient
app.post('/visits', (req, res) => {
  const { patient_id, visit_date, observations } = req.body;
  const query = 'INSERT INTO visits (patient_id, visit_date, observations) VALUES (?, ?, ?)';
  db.query(query, [patient_id, visit_date, observations], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Visit added', visitId: result.insertId });
  });
});

// Get all patients with visits
app.get('/patients', (req, res) => {
  const query = `
    SELECT p.id, p.name, p.age, p.height, v.visit_date, v.observations
    FROM patients p
    LEFT JOIN visits v ON p.id = v.patient_id
    ORDER BY p.id, v.visit_date DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
