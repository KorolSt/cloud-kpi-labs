const express = require('express');
const cors = require('cors');
const app = express();
const PORT =  5000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
