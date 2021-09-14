const express= require("express")
const controller = express.Router()
const cardModel = require("../models/cards")

controller.get("/", async (req,res) => {
    let query = {};
    let { name, number, type, stars, source } = req.query
    if ((name) && (name !== "")) query.name = { $regex: name, $options: "i" };
    if ((number) && (number !== "")) query.id = Number(number);
    if ((type) && (type !== "")) query["type.id"] = Number(type);
    if ((stars) && (stars !== "")) query.stars = Number(stars);
    if ((source) && (source === "purchase")) {
        query[`sources.${source}`] = { $exists: true, $ne: null };
    } else if ((source) && (source !== "")) query[`sources.${source}`] = { $exists: true, $ne: [] };
    let cardList = await cardModel.find(query).sort( { id: 1 } ).exec()
    res.render("cards/cardindex.ejs", {
        card: cardList,
        currentUser: req.session.username,
        name: name,
        number: number,
        type: type,
        stars: stars,
        source: source
    })
})

controller.get("/:id", async (req,res) => {
    const selectedCard = await cardModel.findOne( { id: req.params.id } )
    res.render("cards/cardshow.ejs", {
        card: selectedCard,
        currentUser: req.session.username
    })
})


module.exports = controller