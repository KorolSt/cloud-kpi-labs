const express = require('express');
const router = express.Router();
const pool = require('./db');

 
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching posts');
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching the post');
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body; // userId will come from the auth service
  try {
    const result = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating post');
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Post not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting post');
  }
});

module.exports = router;
