const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// set up mongodb


const uri = `mongodb+srv://${process.env.LC_USER}:${process.env.S3_KEY}@cluster0.nwipcoy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersCollection = client.db("usersDB").collection("users");
    // reed 
    app.get('/users', async(req, res)=>{
        const query = usersCollection.find();
        const result = await query.toArray()
        res.send(result)
    })



    // post 
    app.post('/users',async(req, res)=>{
        const user = req.body;
        console.log(user)
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', async(req, res)=>{
    res.send('lawncare is running...')
});

app.listen(port, ()=>{
    console.log('server site is running is running')
})