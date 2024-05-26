const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use the body-parser middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle POST requests with form data in the body
app.post('/submit', (req, res) => {
  // Access the form data from the req.body object
  const { username, password } = req.body;

  console.log('Username:', username);
  console.log('Password:', password);

  // Send a response
  res.status(200).send('Form data received successfully');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});