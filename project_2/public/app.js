// FUNctionality

function addCard(event) {
    insertValue(event);
  }
function insertValue(event) {
  const array = [document.querySelector("#card1id").value, document.querySelector("#card2id").value, document.querySelector("#card3id").value, document.querySelector("#card4id").value, document.querySelector("#card5id").value]
  if (document.querySelector("#card1id").value === "") {
      document.querySelector("#card1id").value = event.target.dataset.cardid
      array[0] = document.querySelector("#card1id").value
      addImage(1)
    } else if (document.querySelector("#card2id").value === "") {
      if (!array.includes(event.target.dataset.cardid)) {
        document.querySelector("#card2id").value = event.target.dataset.cardid
        array[1] = document.querySelector("#card2id").value
        addImage(2)
      }
    } else if (document.querySelector("#card3id").value === "") {
      if (!array.includes(event.target.dataset.cardid)) {
        document.querySelector("#card3id").value = event.target.dataset.cardid
        array[2] = document.querySelector("#card3id").value
        addImage(3)
      }
    } else if (document.querySelector("#card4id").value === "") {
      if (!array.includes(event.target.dataset.cardid)) {
        document.querySelector("#card4id").value = event.target.dataset.cardid
        array[3] = document.querySelector("#card4id").value
        addImage(4)
      }
    } else if (document.querySelector("#card5id").value === "") {
      if (!array.includes(event.target.dataset.cardid)) {
        document.querySelector("#card5id").value = event.target.dataset.cardid
        array[4] = document.querySelector("#card5id").value
        addImage(5)
      } 
    } 
}
function addImage(no) { 
    let img = document.createElement("img")
    img.setAttribute("src", `${event.target.dataset.image}`)
    document.querySelector(`#card${no}`).appendChild(img)
}
function filterCheck() {
  if (document.querySelector('#rule-filter').checked)  {
    document.querySelector("#rule").classList.remove('d-none')
    document.querySelector("#npc").classList.add("d-none")
  } else if (document.querySelector('#npc-filter').checked){
    document.querySelector("#rule").classList.add("d-none")
    document.querySelector("#npc").classList.remove("d-none")
  } else if (document.querySelector("#general").checked) {
    document.querySelector("#rule").classList.add("d-none")
    document.querySelector("#npc").classList.add("d-none")
  }
}
function removeCard(event) {
  clearValue(event.currentTarget.id)
  removeImage(event.currentTarget)

}
function clearValue(e) {
  document.querySelector(`#${e}id`).value = ""
}
function removeImage(e) {
  e.childNodes[3].remove()
}

function saveValue() {
    if (type === "1") {
        document.querySelector("#type").selectedIndex = "1"
    }
}