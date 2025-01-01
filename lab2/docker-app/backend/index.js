const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = '09WTSbv1';
const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY; // Set your Together AI API key as an environment variable

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

// Register user
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

// Get all posts
app.get('/api/posts', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC', [req.userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});

// Create a new post
app.post('/api/posts', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

// Review endpoint using Together AI
app.post('/api/review', verifyToken, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).send('Content is required for review.');
  }

  try {
    const response = await axios.post(
      'https://api.together.xyz/v1/chat/completions',
      {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
        messages: [
          {
            role: 'user',
            content: `Review this content: ${content}`,
          },
        ],
        max_tokens: 150, // Adjust as needed
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>", "<|eom_id|>"],
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const review = response.data.choices[0]?.message?.content || 'No review available.';
    res.json({ review });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error generating review');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
