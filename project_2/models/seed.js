const loadCardData = async () => {
    try {
        const url = "https://triad.raelys.com/api/cards";
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(err) {
        console.error(err);
    }
}

module.exports = loadCardData;