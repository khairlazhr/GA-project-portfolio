const express= require("express")
const controller = express.Router()
const cardModel = require("../models/cards")

controller.get("/", async (req,res) => {
    let cardList = await cardModel.find().sort( { id: 1 } ).exec()
    res.render("cards/cardindex.ejs", {
        card: cardList
    })
})

controller.get("/search", async (req,res) => {
    let query = {};
    if (req.query.name !== "") query.name = { $regex: req.query.name, $options: "i" };
    if (req.query.number !== "") query.id = Number(req.query.number);
    if (req.query.type !== "") query["type.id"] = Number(req.query.type);
    if (req.query.stars !== "") query.stars = Number(req.query.stars);

    let cardList = await cardModel.find(query).sort( { id: 1 } ).exec()
    res.render("cards/cardindex.ejs", {
        card: cardList
    })
})


module.exports = controller