
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const tutorRoutes = require('./routes/users/usersRoute');


const app = express()
app.use(cors())
app.use(express.json())


const { MongoClient } = require('mongodb');
const port = 3000
app.use(cors())
app.use('/api/users', tutorRoutes)
const User = require('./models/users/users');

const urii = 'mongodb+srv://dev326patil:devrajcapstone326@capstone.riouq2l.mongodb.net/?retryWrites=true&w=majority&appName=Capstone';
const client = new MongoClient(urii);
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas Successfully');
    const database = client.db('Whole_data');
    const collection = database.collection('Overall');

    app.get('/', async (req,res)=>{
    const result = await collection.find({}).toArray(
        
    );
      res.json(result);
    })

  })
  .catch(err => {
    console.error('An Error while connecting to MongoDB Atlas', err);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, return error response
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If email and password match, return success response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

