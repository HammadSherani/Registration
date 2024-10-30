const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./User');


const port = process.env.PORT || 3000;
require('dotenv').config();

// Use an environment variable for your MongoDB URI


const uri = process.env.MONGODB_URI || 'mongodb+srv://HammadSherani:HammadSherani@cluster0.ofmvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(uri)
.then(() => {
    console.log('MongoDB connected successfully');
    // Start the server after the database connection is successful
    app.listen(port, () => {
        console.log("Server is listening on port", port);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// POST endpoint to submit data
app.post("/api/submit", async (req, res) => {
    const { name, email, passwprd } = req.body;

    try {
        const newUser = new User({ name, email, password });
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }

    console.log("Username:", name, "Email:", email);
    
    // Send a response back to the client
    res.status(201).json({ message: "Data received", name, email });
});

// Optional: GET endpoint to retrieve submitted data
app.get("/api/submit", (req, res) => {
    // Here you would normally retrieve data from your database
    res.send("All submitted data would go here (not yet implemented).");
});


