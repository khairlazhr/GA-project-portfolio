const express = require("express");
const mongoose = require("mongoose"); 
const session = require("express-session");
const methodOverride = require("method-override");
require('dotenv').config()

const Card = require("./models/cards");
const cardSeed = require("./models/seed");

// Controller routes
const homepageController = require("./controllers/homepageController");
const cardController = require("./controllers/cardController");
const deckController = require("./controllers/deckController");
const userController = require("./controllers/userController")


const mongoURI = process.env.MONGODB_URI;
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {
    ignoreUndefined: true
});

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Successfully connected to my database"));
dbConnection.on("disconnected", () => console.log("The database connection has ended"));

// Async function needed to resolve the promise carried over from fetch. Data is then fed into the database according to Schema
// ( async() => {
//     const cardData = await cardSeed
//     // Card.create(cardData, ( err , data ) => {
//     //     if ( err ) console.log ( err.message )
//     //     console.log( "added card data" )
//     // })
//     Card.create(cardData)
//         .then(() => {
//             console.log("added card data")
//         })
//         .catch((err) => {
//             console.log(err.message)
//         })
// })();


const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true }))
app.use(methodOverride("_method"))
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}))

app.use(homepageController);
app.use("/users", userController);
app.use("/cards", cardController);
app.use("/decks", deckController);


const PORT = process.env.PORT
app.listen(PORT);

