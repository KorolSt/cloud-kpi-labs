import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const createPost = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        fetchPosts();
        setTitle('');
        setContent('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        fetchPosts();
        setTitle('');
        setContent('');
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (response.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Vlog Posts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingId ? updatePost() : createPost();
        }}
      >
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'} Post</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button
              onClick={() => {
                setEditingId(post.id);
                setTitle(post.title);
                setContent(post.content);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
