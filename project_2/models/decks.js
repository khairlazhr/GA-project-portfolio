const mongoose = require("mongoose");
const { Schema } = mongoose;

const deckSchema = new Schema(
    {
        id: Number,
        usage: { type: String, required: true },
        user: { type: String, required: true },
        upvotes: Number,
        cards: {
            card1id: {type: Schema.Types.ObjectId, ref: 'Card'},
            card2id: {type: Schema.Types.ObjectId, ref: 'Card'},
            card3id: {type: Schema.Types.ObjectId, ref: 'Card'},
            card4id: {type: Schema.Types.ObjectId, ref: 'Card'},
            card5id: {type: Schema.Types.ObjectId, ref: 'Card'},
        },
        notes: String,
    }
);

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;