const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4002;
 
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: 'https://cloud-kpi-labs-1.onrender.com',  
    changeOrigin: true,
  })
);
 
app.use(
  '/api/posts',
  createProxyMiddleware({
    target: 'https://lab3-posts-service.onrender.com',  
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
