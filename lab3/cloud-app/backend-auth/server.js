const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Authentication Service Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Authentication service running at http://localhost:${PORT}`);
});
