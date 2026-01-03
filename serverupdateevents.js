const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

// Setup MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'events_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Route to get all events
app.get('/api/events', (req, res) => {
  const query = 'SELECT * FROM events';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching events');
    }
    res.json(results);
  });
});

// Route to update an event
app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const query = 'UPDATE events SET title = ?, description = ? WHERE id = ?';

  db.query(query, [title, description, id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating event');
    }
    res.send('Event updated successfully');
  });
});

// Route to delete an event
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM events WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting event');
    }
    res.send('Event deleted successfully');
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
