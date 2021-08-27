const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
    {
        id: Number,
        name: "Omega",
        "description": "A self-evolving weapon originating from a distant star, Omega is able to upgrade its own functions and expand its armaments by analyzing data accumulated through combat with other powerful entities. It was research into this machine in its dormant state which allowed the ancient Allagans to achieve incredible advances in aetherochemical technologies.",
        "stars": 5,
        "patch": "4.4",
  "order_group": 0,
  "order": 223,
  "deck_order": 47,
        "icon": "https://triad.raelys.com/images/cards/small/240.png",
        "image": "https://triad.raelys.com/images/cards/large/240.png",
        "stats": {
            "numeric": {"top": 6, "right": 9, "bottom": 3, "left": 10 },
            "formatted": {"top": "6", "right": "9", "bottom": "3", "left": "A"}
        },
        "type": {"id": 0, "name": "Normal", "image": null },
        "sources": {
            "npcs": [],
            "pack": null,
            "drops": ["Raid: Alphascape V3.0", "Raid: Alphascape V4.0"],
            "purchase": null
        },
    }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;