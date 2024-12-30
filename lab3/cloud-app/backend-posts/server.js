const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRouter = require('./posts');

const app = express();
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', postsRouter);

app.listen(PORT, () => {
  console.log(`Post service running on http://localhost:${PORT}`);
});
