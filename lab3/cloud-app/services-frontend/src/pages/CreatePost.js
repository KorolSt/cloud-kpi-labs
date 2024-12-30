import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://lab3-gateway-service.onrender.com/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to create post!');
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
            <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
