const express= require("express");
const controller = express.Router();
const userModel = require("../models/users");
const bcrypt = require('bcrypt');

const saltRounds = 10;

function isAuthenticated() {
  return (req, res, next) => {
      if (req.session.username) {
          next()
        } else {
          res.status(403);
          res.send("You need to be logged in!");
        }
    }
};



controller.get("/signup", (req,res) => {
    if (req.session.username){
        res.redirect("/?loggedin=true");
    } else {
      res.render("users/signup.ejs", {
        currentUser: req.session.username
      })
    }
})

controller.post("/signup", async (req,res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedConfirmPassword = await bcrypt.hash(req.body.confirmpw, salt)
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }
    if (hashedPassword === hashedConfirmPassword) {
      await userModel.create(user)
      req.session.username = user.username;
      res.redirect("/users/login")
    }
  } catch (err) {
    console.log(err)
  }
})


controller.get("/login", (req, res) => {
    if (!req.session.username) {
      res.render("users/login.ejs", {
        currentUser: req.session.username
      });
    } else {
      res.redirect("/");
    }
}); 

controller.post("/login", async (req, res) => {
  const selectedUser = await userModel.findOne({username: req.body.username});
  if (!selectedUser) {
    return res.send("Username does not exist");
  } 
  if (bcrypt.compareSync(req.body.password, selectedUser.password)) {
    req.session.username = selectedUser.username;
    req.session.decks = selectedUser.decks
    res.redirect("/");
  } else {
    res.send("Wrong password!");
  }
})

controller.get("/changepw", (req, res) => {
  if (req.session.username){
    res.redirect("/?loggedin=true");
} else {
  res.render("users/changepw.ejs", {
    currentUser: req.session.username
  })
}
}); 

controller.put("/:id", async (req, res) => {
  try {
    const selectedUser = await userModel.findOne({username: req.body.username});
  if (!selectedUser) {
    return res.send("Username does not exist");
  } 
  if (bcrypt.compareSync(req.body.oldpw, selectedUser.password)) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedConfirmPassword = await bcrypt.hash(req.body.confirmpw, salt)
    if (hashedPassword === hashedConfirmPassword) {
      await userModel.updateOne( { username: req.body.username }, { $set: { password: hashedPassword }})
    }
    res.redirect(`/users/login?pwchanged=success`)
    }
  } catch (err) {
    console.log(err)
  }
})

controller.get("/logout", isAuthenticated(), (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = controller