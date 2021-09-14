const express = require("express");
const mongoose = require("mongoose"); 
const session = require("express-session");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

// const Card = require("./models/cards");
// const cardSeed = require("./models/seed");

// Controller routes
const homepageController = require("./controllers/homepageController");
const cardController = require("./controllers/cardController");
const deckController = require("./controllers/deckController");
const userController = require("./controllers/userController")


const mongoURI = "mongodb://localhost:27017/triple-triad";
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    ignoreUndefined: true
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

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true }))
app.use(methodOverride("_method"))
app.use(cookieParser());
app.use(express.json());

const oneSession = 1000 * 60 * 15

app.use(session({
    secret: "Fm4faAmsd5fZnf1k6dDSfi7sa89ptD",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneSession},
}))

app.use(homepageController);
app.use("/users", userController);
app.use("/cards", cardController);
app.use("/decks", deckController);


app.listen(3000);

