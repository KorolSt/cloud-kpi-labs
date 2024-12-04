const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Project!');
});

app.post('/test', (req, res) => {
  res.json({ message: 'Data received!', data: req.body });
});

// Start server
app.listen(port, () => {
  console.log(`Server running locally on http://localhost:${port}`);
});
