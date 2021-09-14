const express= require("express");
const controller = express.Router();

controller.get("/", (req, res) => {
    res.render("homepage.ejs", {
        currentUser: req.session.username,
        loggedin: req.query.loggedin
    })
});

controller.get("/about", (req, res) => {
    res.render("about.ejs", {
        currentUser: req.session.username
    })
})

module.exports = controller;