const mongoose = require("mongoose");
const { Schema } = mongoose;
const cardModel = require("./cards")

const deckSchema = new Schema(
    {
        id: Number,
        usage: { type: String, required: true },
        user: { type: String, required: true },
        upvotes: Number,
        cards: {
            card1id: { type: Number, required: true },
            card2id: { type: Number, required: true },
            card3id: { type: Number, required: true },
            card4id: { type: Number, required: true },
            card5id: { type: Number, required: true },
        },
        notes: String,
    }
);

// deckSchema.virtual('cardLinks', {
//     ref: 'Card',
//     localfield: "cards.card1id",
//     foreignfield: "id",
//     justOne: true,
// })

// deckSchema.virtual('cardLinks2', {
//     ref: 'Card',
//     localfield: "cards.card2id",
//     foreignfield: "id",
//     justOne: true,
// })

// deckSchema.virtual('cardLinks3', {
//     ref: 'Card',
//     localfield: "cards.card3id",
//     foreignfield: "id",
//     justOne: true,
// })

// deckSchema.virtual('cardLinks4', {
//     ref: 'Card',
//     localfield: "cards.card4id",
//     foreignfield: "id",
//     justOne: true,
// })

// deckSchema.virtual('cardLinks5', {
//     ref: 'Card',
//     localfield: "cards.card5id",
//     foreignfield: "id",
//     justOne: true,
// })

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;