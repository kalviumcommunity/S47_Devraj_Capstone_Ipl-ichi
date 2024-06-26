
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

    app.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return error response
        if (!user || user.password !== password) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, your_secret_key, { expiresIn: '1h' });

        // Set JWT token in a cookie
        res.cookie('JWToken', token);

        // Log the logged-in user
        console.log('Logged in user:', user);

        res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/signup', async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });

        sendOtp(email);

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, your_secret_key, { expiresIn: '1h' });

        // Set JWT token in a cookie
        res.cookie('JWToken', token, { httpOnly: true });

        res.status(201).json({ message: 'User created successfully', token });
      } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


  })
  .catch(err => {
    console.error('An Error while connecting to MongoDB Atlas', err);
});

app.put('/updateProfile', async (req, res) => {
  try {
    const { email, name } = req.body;
    // Find user by email and update name
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name } },
      { new: true } // Return the updated document
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/payment", async (req,res)=>{
  try{
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if(!order){
      return res.status(500).send("Error")
    } 
    res.json(order)
  }catch(error){
    console.log(error)
    res.status(500).send("Error")
      }
    });



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

