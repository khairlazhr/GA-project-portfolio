const fetch = require("node-fetch") // Dependency needed to run fetch in node.js (Not needed if done in browser)
const loadCardData = async () => {
    try {
        const url = "https://triad.raelys.com/api/cards";
        const res = await fetch(url);
        const data = await res.json();
        return data.results;
    } catch(err) {
        console.error(err);
    }
};

module.exports = loadCardData()
