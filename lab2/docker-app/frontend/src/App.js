import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const backendUrl = 'https://vlog-backend.onrender.com';

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Create a new post
  const createPost = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        fetchPosts();
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      await fetch(`${backendUrl}/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Vlog Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        ></textarea>
        <button onClick={createPost} style={{ width: '100%' }}>
          Create Post
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '20px' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
