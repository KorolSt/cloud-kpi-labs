import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [review, setReview] = useState(''); // For storing the review
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://vlog-backend.onrender.com/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create post!');
    }
  };

  const handleReviewContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://vlog-backend.onrender.com/api/review',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview(response.data.review); // Set the review in state
    } catch (err) {
      console.error(err);
      alert('Failed to generate review!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Post</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleCreatePost}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Create</button>
            <button
              type="button"
              className="btn btn-info"
              onClick={handleReviewContent}
            >
              Generate Review
            </button>
            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          </div>
        </form>
        {review && (
          <div className="mt-4">
            <h4>Generated Review:</h4>
            <p>{review}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
