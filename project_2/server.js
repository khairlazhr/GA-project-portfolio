const express = require("express");
const mongoose = require("mongoose"); 
const methodOverride = require("method-override");

const Card = require("./models/cards");
const cardSeed = require("./models/seed");

// Controller routes
const homepageController = require("./controllers/homepageController");
const cardController = require("./controllers/cardController")


const mongoURI = "mongodb://localhost:27017/triple-triad";
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Successfully connected to my database"));
dbConnection.on("disconnected", () => console.log("The database connection has ended"));

// Async function needed to resolve the promise carried over from fetch. Data is then fed into the database according to Schema
// ( async() => {
//     const cardData = await cardSeed
//     Card.create(cardData, ( err , data ) => {
//         if ( err ) console.log ( err.message )
//         console.log( "added card data" )
//     })
// })();


const app = express();

// app.use(express.static("public"));

app.use(homepageController);
app.use("/cards", cardController);


app.listen(3000);