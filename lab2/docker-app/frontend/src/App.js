import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const backendUrl = 'https://vlog-backend.onrender.com';

  // Registration function
  const register = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        console.log('User registered successfully');
        alert('Registration successful! You can now log in.');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  // Login function
  const login = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  // Create a new post
  const createPost = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        console.log('Post created successfully');
        alert('Post created successfully');
        setTitle('');
        setContent('');
      } else {
        console.error('Post creation failed');
        alert('Post creation failed');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>

      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>

      {token && (
        <>
          <h1>Create Post</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={createPost}>Create</button>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
