import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("You must be logged in to access the dashboard!");
            navigate("/");
            return;  
        }

        const response = await axios.get('https://lab3-gateway-service.onrender.com/api/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://vlog-backend.onrender.com/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((post) => post.id !== id));
      alert("Post deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");  
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="mb-4">
        <Link to="/create-post" className="btn btn-primary">
          Create Post
        </Link>
        <Link to="/posts-all" className="btn btn-secondary ms-3">
          View All Posts
        </Link>
      </div>
      <div className="list-group">
        {posts.map((post) => (
          <div
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
          >
            <div>
              <h5 className="mb-1">{post.title}</h5>
              <p className="mb-1">{post.content}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
