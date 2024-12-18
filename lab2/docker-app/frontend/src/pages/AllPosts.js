import React, { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to view all posts!");
          navigate("/");
          return;
        }

        const response = await fetch("https://vlog-backend.onrender.com/api/posts-all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          alert("Failed to fetch posts.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    };

    fetchAllPosts();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Posts</h1>
      <p className="text-center">
        <Link to="/dashboard">
          <button className="btn btn-primary">Go to Dashboard</button>
        </Link>
      </p>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <div className="card p-3">
              <h3 className="card-title">{post.title}</h3>
              <p className="card-text">{post.content}</p>
              <p>
                <strong>By:</strong> {post.username}
              </p>
              <p>
                <em>Created At:</em>{" "}
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
