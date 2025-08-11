const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const PORT = 3030;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));   
})

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//Get all users
app.get("/getUsers", async (req, res) => {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my-sample-db");
    const data = await db.collection("users").find({}).toArray();

    client.close();
    res.send(data);
})

//Post new users
app.post("/addUser", async(req, res) =>{
    const userObj = req.body;
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("my-sample-db");
    const data = await db.collection("users").insertOne(userObj);
    console.log(data)
    console.log("data inserted");
    client.close();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})