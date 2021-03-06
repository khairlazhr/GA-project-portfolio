const express= require("express")
const controller = express.Router()
const deckModel = require("../models/decks")
const cardModel = require("../models/cards")

function isAuthenticated() {
    return (req, res, next) => {
        if (req.session.username) {
            next()
          } else {
            res.redirect("/users/login");
          }
      }
};
    

controller.get("/", async (req,res) => {
    let query = {};
    let { npc, rule } = req.query;
    if ((npc) && (npc !== "")) query.usage = npc;
    if ((rule) && (rule !== "")) query.usage = rule;
    const deckIndex = await deckModel.find(query)
                                        .populate("cards.card1id")
                                        .populate("cards.card2id")
                                        .populate("cards.card3id")
                                        .populate("cards.card4id")
                                        .populate("cards.card5id")
                                        .sort( { id: 1 } )
                                        .exec();
    res.render("decks/deckindex.ejs", {
        decks: deckIndex,
        currentUser: req.session.username
    })
})

controller.get("/mydecks", isAuthenticated() , async (req,res) => {
    const currentUser = req.session.username
    let query = { user: currentUser };
    let { npc, rule } = req.query;
    if ((npc) && (npc !== "")) query.usage = npc;
    if ((rule) && (rule !== "")) query.usage = rule;
    const deckIndex = await deckModel.find(query)
                                        .populate("cards.card1id")
                                        .populate("cards.card2id")
                                        .populate("cards.card3id")
                                        .populate("cards.card4id")
                                        .populate("cards.card5id")
                                        .sort( { id: 1 } )
                                        .exec();
    if (deckIndex.user === req.session.username) {
        res.render("decks/mydecksindex.ejs", {
            decks: deckIndex,
            currentUser: req.session.username,
    })} else {
        res.redirect("/decks")
    }
})

controller.get("/new", isAuthenticated() ,async (req,res) => {
    const cardList = await cardModel.find().sort( { id: 1 } ).exec()
    res.render("decks/decknew.ejs", {
        cards: cardList,
        currentUser: req.session.username,
    })
})

controller.post("/", isAuthenticated(), async (req,res) => {
    try {
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
            user: req.body.user,
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
    } catch {
        res.redirect("/decks")
    }
});

controller.get("/:id", async (req,res) => {
    const deckShow = await deckModel.findOne( { id: req.params.id } )
                                    .populate("cards.card1id")
                                    .populate("cards.card2id")
                                    .populate("cards.card3id")
                                    .populate("cards.card4id")
                                    .populate("cards.card5id")
                                    .exec();

    res.render("decks/deckshow.ejs", {
        deck: deckShow,
        currentUser: req.session.username
    })
})

controller.get("/:id/edit", isAuthenticated(), async (req, res) => {
    const deckShow = await deckModel.findOne( { id: req.params.id } )
                                    .populate("cards.card1id")
                                    .populate("cards.card2id")
                                    .populate("cards.card3id")
                                    .populate("cards.card4id")
                                    .populate("cards.card5id")
                                    .exec();
    const cardList = await cardModel.find().sort( { id: 1 } ).exec()
    if (deckShow.user === req.session.username) {
        res.render('decks/deckedit.ejs', {
            deck: deckShow,
            cards: cardList,
            currentUser: req.session.username
          });
    } else {
        res.redirect(`/decks/${req.params.id}`)
    }
    
  });
  
controller.put("/:id", isAuthenticated(), async (req, res) => {
    let use = ""
    if (req.body.rule !== "") {
        use = req.body.rule
    } else if (req.body.npc !== "") {
        use = req.body.npc
    } else {
        use = req.body.flexRadioDefault
    }
    const inputs = {
        usage: use,
        user: req.body.username,
        cards: {
            card1id: req.body.card1id,
            card2id: req.body.card2id,
            card3id: req.body.card3id,
            card4id: req.body.card4id,
            card5id: req.body.card5id,
        },
        notes: req.body.notes
    }
    await deckModel.updateOne({id: req.params.id}, inputs);
  
    res.redirect(`/decks/${req.params.id}`);
});

controller.delete("/:id", isAuthenticated(), async (req, res) => {
    await deckModel.deleteOne( { id: req.params.id } );
    res.redirect("/decks");
  })

module.exports = controller



