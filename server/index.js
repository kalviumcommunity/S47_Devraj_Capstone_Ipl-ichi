const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())


const { MongoClient } = require('mongodb');
const port = 3000
app.use(cors())

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});