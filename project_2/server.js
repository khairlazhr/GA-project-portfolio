const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const cardSeed = require("./models/seed")

// Controller routes
const homepageController = require("./controllers/homepageController")



const mongoURI = "mongodb://localhost:27017/triple-triad";
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Successfully connected to my database"));
dbConnection.on("disconnected", () => console.log("The database connection has ended"));



const app = express();