// FUNctionality

function toggleFilterBox() {
    if (document.querySelector('#rule-filter').checked) {
        document.querySelector("#rule").classList.remove("d-none")
    }
    if (document.querySelector('#npc-filter').checked) {
        document.querySelector("#npc").classList.remove("d-none")
    }
}

toggleFilterBox()
