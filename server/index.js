// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const tutorRoutes = require('./routes/users/usersRoute');
// const User = require('./models/users/users');
// const { MongoClient } = require('mongodb');                                                                                                                                                                                                                                                  
// const sendOtp = require('./emailOtp');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser'); // Import cookie-parser
// const your_secret_key = require('./config/secretKey');
// const { generateContent } = require('./aiService');
// dotenv.config();

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser()); // Set up cookie-parser

// // MongoDB connection setup
// const uri = 'mongodb+srv://dev326patil:devrajcapstone326@capstone.riouq2l.mongodb.net/?retryWrites=true&w=majority&appName=Capstone';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect()
//   .then(() => {
//     console.log('Connected to MongoDB Atlas Successfully');
//     const database = client.db('Whole_data');
//     const collectionOverall = database.collection('Overall');
//     const collectionPlayer_Data = database.collection('Player_Data');
//     const collectionFood_data = database.collection('Food_data');

//     app.get('/', async (req,res)=>{
//       const result = await collectionOverall.find({}).toArray();
//       res.json(result);
//     });

//     app.get('/player', async (req, res) => {
//       try {
//         const playerData = await collectionPlayer_Data.find({}).toArray();
//         res.json(playerData);
//       } catch (error) {
//         console.error('Error fetching player data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     app.get('/food',async(req,res)=>{
//       try{
//         const food_data = await collectionFood_data.find({}).toArray();
//         res.json(food_data);
//       }catch(error){
//         console.error('Error fetching food data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     app.post('/getFirstName', async (req, res) => {
//       try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (user) {
//           res.json(user);
//         } else {
//           res.status(404).json({ error: 'User not found' });
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     app.put('/updateProfile', async (req, res) => {
//       try {
//         const { email, name } = req.body;
//         // Find user by email and update name
//         const updatedUser = await User.findOneAndUpdate(
//           { email },
//           { $set: { name } },
//           { new: true } // Return the updated document
//         );
//         if (updatedUser) {
//           res.json(updatedUser);
//         } else {
//           res.status(404).json({ error: 'User not found' });
//         }
//       } catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     // Routes setup
//     app.use('/api/users', tutorRoutes);

//     // Signup route
//     app.post('/signup', async (req, res) => {
//       try {
//         const { name, email, password } = req.body;
//         const newUser = await User.create({ name, email, password });

//         sendOtp(email);

//         // Generate JWT token
//         const token = jwt.sign({ userId: newUser._id, email: newUser.email }, your_secret_key, { expiresIn: '1h' });

//         // Set JWT token in a cookie
//         res.cookie('JWToken', token, { httpOnly: true });

//         res.status(201).json({ message: 'User created successfully', token });
//       } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     // Login route
//     app.post('/login', async (req, res) => {
//       const { email, password } = req.body;

//       try {
//         // Find user by email
//         const user = await User.findOne({ email });

//         // If user not found or password doesn't match, return error response
//         if (!user || user.password !== password) {
//           return res.status(401).json({ error: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id, email: user.email }, your_secret_key, { expiresIn: '1h' });

//         // Set JWT token in a cookie
//         res.cookie('JWToken', token);

//         // Log the logged-in user
//         console.log('Logged in user:', user);

//         res.status(200).json({ message: 'Login successful', token });
//       } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });


//     // Protected route example
//     app.get('/protected', verifyToken, (req, res) => {
//       // Log the signed-in user
//       console.log('Signed in user:', req.user);

//       res.status(200).json({ message: 'Protected route accessed successfully', user: req.user });
//     });

//     // Payment routes
//     app.post("/api/payment", async (req,res)=>{
//       try{
//         const razorpay = new Razorpay({
//           key_id: process.env.RAZORPAY_KEY_ID,
//           key_secret: process.env.RAZORPAY_SECRET,
//         });
//         const options = req.body;
//         const order = await razorpay.orders.create(options);
    
//         if(!order){
//           return res.status(500).send("Error")
//         } 
//         res.json(order)
//       }catch(error){
//         console.log(error)
//         res.status(500).send("Error")
//       }
//     });
    
//     app.post("/api/payment/validate", async(req,res) =>{
//       const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    
//       const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//       sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//       const digest = sha.digest("hex");
//       if(digest !== razorpay_signature){
//           return res.status(400).json({msg:"Transaction is not legit!"});
//       }
    
//       res.json({
//           msg : "Success",
//           orderId : razorpay_order_id,
//           paymentId : razorpay_payment_id,
//         })
//     });

//     app.post('/ai', async (req, res) => {
//       const { prompt } = req.body;
//       try {
//         const response = await generateContent(prompt);
//         res.json({ response });
//       } catch (error) {
//         console.error('Error generating content:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     // Start server
//     app.listen(port, () => {
//       console.log(`Server running at http://localhost:${port}`);
//     });

//     // Other routes and middleware...

//   })
//   .catch(err => {
//     console.error('An Error while connecting to MongoDB Atlas', err);
//   });

// function verifyToken(req, res, next) {
//   // Extract the token from the authorization headers
//   const authHeader = req.headers['authorization'];
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }
  
//   const token = authHeader.split(' ')[1];

//   jwt.verify(token, your_secret_key, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }
//     req.user = decoded;
//     next();
//   });
// }







const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const tutorRoutes = require('./routes/users/usersRoute');
const User = require('./models/users/users');
const { MongoClient } = require('mongodb');                                                                                                                                                                                                                                                  
const sendOtp = require('./emailOtp');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const your_secret_key = require('./config/secretKey');
const { generateContent } = require('./aiService');
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Set up cookie-parser

// MongoDB connection setup
const uri = 'mongodb+srv://dev326patil:devrajcapstone326@capstone.riouq2l.mongodb.net/?retryWrites=true&w=majority&appName=Capstone';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas Successfully');
    const database = client.db('Whole_data');
    const collectionOverall = database.collection('Overall');
    const collectionPlayer_Data = database.collection('Player_Data');
    const collectionFood_data = database.collection('Food_data');

    app.get('/', async (req,res)=>{
      const result = await collectionOverall.find({}).toArray();
      res.json(result);
    });

    app.get('/player', async (req, res) => {
      try {
        const playerData = await collectionPlayer_Data.find({}).toArray();
        res.json(playerData);
      } catch (error) {
        console.error('Error fetching player data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/food',async(req,res)=>{
      try{
        const food_data = await collectionFood_data.find({}).toArray();
        res.json(food_data);
      }catch(error){
        console.error('Error fetching food data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/getFirstName', async (req, res) => {
      try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
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

    // Routes setup
    app.use('/api/users', tutorRoutes);

    // Signup route
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

    // Login route
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


    // Protected route example
    app.get('/protected', verifyToken, (req, res) => {
      // Log the signed-in user
      console.log('Signed in user:', req.user);

      res.status(200).json({ message: 'Protected route accessed successfully', user: req.user });
    });

    // Payment routes
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
    
    app.post("/api/payment/validate", async(req,res) =>{
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    
      const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = sha.digest("hex");
      if(digest !== razorpay_signature){
          return res.status(400).json({msg:"Transaction is not legit!"});
      }
    
      res.json({
          msg : "Success",
          orderId : razorpay_order_id,
          paymentId : razorpay_payment_id,
        })
    });

    app.post('/ai', async (req, res) => {
      const { prompt } = req.body;
      try {
        const response = await generateContent(prompt);
        res.json({ response });
      } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

    // Other routes and middleware...

  })
  .catch(err => {
    console.error('An Error while connecting to MongoDB Atlas', err);
  });

function verifyToken(req, res, next) {
  // Extract the token from the authorization headers
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  
  const token = authHeader.split(' ')[1];

  jwt.verify(token, your_secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
