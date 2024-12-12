import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace with your backend URL
    const backendUrl = process.env.REACT_APP_API_URL || 'https://vlog-backend.onrender.com/api/hello';
    
    fetch(backendUrl)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Frontend</h1>
      <p>Message from backend:</p>
      <h2>{message || 'Loading...'}</h2>
    </div>
  );
}

export default App;
