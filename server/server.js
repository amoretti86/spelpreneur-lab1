const express = require('express');
const { pool, initDb } = require('./db'); // Import the db module
require('dotenv').config();
const app = express();

app.use(express.json()); // To parse JSON bodies

// Call initDb to initialize the database when the server starts
initDb();

// Route to handle form submissions
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
