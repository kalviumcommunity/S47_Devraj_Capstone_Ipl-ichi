const express = require('express');

// Created an Express application
const app = express();

// Defined a route
app.get('/', (req, res) => {
  res.send('Hey, there my server is live! 😁😁😁😁😁😁');
});

// Started the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
