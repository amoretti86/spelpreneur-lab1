const express = require('express');
const path = require('path');
const { pool, initDb } = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());

// Initialize database
initDb();

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// API route for form submissions
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json({ message: 'User added successfully', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user to database' });
  }
});

// Fallback route to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
