const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        stars: Number,
        patch: String,
        icon: String,
        image: String,
        stats: { numeric: { 
            top: Number, 
            right: Number,
            bottom: Number,
            left: Number
            }, 
        formatted: {
            top: String,
            right: String,
            bottom: String,
            left: String
            }
        },
        type: { 
            id: Number,
            name: String,
            image: String
        },
        sources: {
            npcs: Array,
            packs: Array,
            drops: Array,
            purchase: Number
        },
    }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;