const express= require("express");
const controller = express.Router();
const userModel = require("../models/users");
const bcrypt = require('bcrypt');

const saltRounds = 10;

controller.get("/signup", (req,res) => {
    res.render("users/signup.ejs")
})

controller.post("/signup", async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }
    await User.create(user)
})


controller.get("/login", (req, res) => {
    if (!req.session.username) {
      res.render("users/login.ejs");
    } else {
      res.redirect("/");
    }
});


module.exports = controller