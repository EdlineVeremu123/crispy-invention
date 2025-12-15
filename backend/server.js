const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from public folder (for local dev)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

// MySQL connection via env vars for deploy safety
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'clinic'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Helpers
const mapPatientRow = row => ({
  patient_id: row.id,
  name: row.name,
  age: row.age,
  height: row.height,
  visits: []
});

// Routes

// Add new patient
app.post('/api/patients', (req, res) => {
  const { name, age, height } = req.body;
  const query = 'INSERT INTO patients (name, age, height) VALUES (?, ?, ?)';
  db.query(query, [name, age, height], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Patient added', patient_id: result.insertId });
  });
});

// Add visit for a patient
app.post('/api/visits', (req, res) => {
  const { patient_id, visit_date, observations } = req.body;
  const query = 'INSERT INTO visits (patient_id, visit_date, observations) VALUES (?, ?, ?)';
  db.query(query, [patient_id, visit_date, observations], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visit added', visit_id: result.insertId });
  });
});

// Get all patients with grouped visits
app.get('/api/patients', (req, res) => {
  const query = `
    SELECT p.id, p.name, p.age, p.height, v.id as visit_id, v.visit_date, v.observations
    FROM patients p
    LEFT JOIN visits v ON p.id = v.patient_id
    ORDER BY p.id, v.visit_date DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const patientsMap = new Map();
    results.forEach(row => {
      if (!patientsMap.has(row.id)) {
        patientsMap.set(row.id, mapPatientRow(row));
      }
      if (row.visit_id) {
        patientsMap.get(row.id).visits.push({
          visit_id: row.visit_id,
          visit_date: row.visit_date,
          observations: row.observations
        });
      }
    });

    res.json(Array.from(patientsMap.values()));
  });
});

// Start server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
