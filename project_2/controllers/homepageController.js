const express= require("express");
const controller = express.Router();

controller.get("/", (req, res) => {
    res.render("homepage.ejs")
});

controller.get("/about", (req, res) => {
    res.render
})

module.exports = controller;