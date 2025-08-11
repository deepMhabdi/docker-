const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const PORT = 3030;

// Your MongoDB credentials (from Docker env vars)
const username = "deep_admin";
const password = "deep_password";

// Add credentials & authSource=admin
const uri = `mongodb://${username}:${password}@localhost:27017/?authSource=admin`;

const client = new MongoClient(uri);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));   
});

// Get all users
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("my-sample-db");
        const data = await db.collection("users").find({}).toArray();

        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    } finally {
        await client.close();
    }
});

// Post new user
app.post("/addUser", async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("my-sample-db");
        const result = await db.collection("users").insertOne(req.body);

        console.log("Data inserted:", result);
        res.send("User added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding user");
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
