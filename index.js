const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userRegistration', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password,
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error registering user');
    } else {
      res.send('User registered successfully');
    }
  });
});

// Server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:${PORT}');
});