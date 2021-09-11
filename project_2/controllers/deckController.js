const express= require("express")
const controller = express.Router()
const deckModel = require("../models/decks")
const cardModel = require("../models/cards")

controller.get("/", async (req,res) => {
    let query = {};
    let { npc, rule } = req.query;
    if ((npc) && (npc !== "")) query.usage = npc;
    if ((rule) && (rule !== "")) query.usage = rule;
    const deckIndex = await deckModel.find(query).sort( { id: 1 } ).exec();
    const cardIndex = await cardModel.find().sort( { id: 1 } ).exec()
    res.render("decks/deckindex.ejs", {
        decks: deckIndex,
        cards: cardIndex
    })
})

controller.get("/new", async (req,res) => {
    cardDetails = await cardModel.find().sort( { id: 1 } ).exec()
    res.render("decks/decknew.ejs", {
        cards: cardDetails
    })
})

controller.post("/", async (req,res) => {
    let currentPostId = await deckModel.countDocuments();
    let newPostId = currentPostId+1;
    let use = ""
    if (req.body.rule !== "") {
        use = req.body.rule
    } else if (req.body.npc !== "") {
        use = req.body.npc
    } else {
        use = req.body.flexRadioDefault
    }
    const inputs = {
        id: newPostId,
        usage: use,
        user: "testUser",
        cards: {
            card1id: req.body.card1id,
            card2id: req.body.card2id,
            card3id: req.body.card3id,
            card4id: req.body.card4id,
            card5id: req.body.card5id,
        },
        notes: req.body.notes
    }
    await deckModel.create(inputs)
    res.redirect("/decks")
})

controller.get("/:id", async (req,res) => {
    const deckShow = await deckModel.findOne( { id: req.params.id } )
    const cardIndex = await cardModel.find().sort( { id: 1 } ).exec()
    res.render("decks/deckshow.ejs", {
        deck: deckShow,
        cards: cardIndex
    })
})

controller.get("/:id/edit", async (req, res) => {
    const deckShow = await deckModel.findOne( { id: req.params.id } )
    const cardIndex = await cardModel.find().sort( { id: 1 } ).exec()
    res.render('decks/deckedit.ejs', {
      deck: deckShow,
      cards: cardIndex
    });
  });
  
controller.put("/:id", async (req, res) => {
    let use = ""
    if (req.body.rule !== "") {
        use = req.body.rule
    } else if (req.body.npc !== "") {
        use = req.body.npc
    } else {
        use = req.body.flexRadioDefault
    }
    console.log(req.body)
    const inputs = {
        usage: use,
        user: "testUser",
        cards: {
            card1id: req.body.card1id,
            card2id: req.body.card2id,
            card3id: req.body.card3id,
            card4id: req.body.card4id,
            card5id: req.body.card5id,
        },
        notes: req.body.notes
    }
    await deckModel.updateOne({id: req.params.id,}, inputs);
  
    res.redirect(`/decks/${req.params.id}`);
});

controller.delete("/:id", async (req, res) => {
    await deckModel.deleteOne( { id: req.params.id } );
  
    res.redirect("/decks");
  })

module.exports = controller



