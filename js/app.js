/*
 * Create a list that holds all of your cards
 */

const container = document.querySelector(".container");

const list = document.createElement("ul");
list.classList.add("deck");
container.appendChild(list);
const classIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", 
                    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
shuffle(classIcons);
for (let i= 0; i<classIcons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    list.appendChild(card);
    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add(classIcons[i]);
    card.appendChild(icon);

}
const cards = document.getElementsByClassName("card");

// Add open and show class to the cards

const cards = document.getElementsByClassName("card");
for (elem of cards){
    elem.onclick = function(event){
        event.target.classList.add("open", "show");
        console.log("cliquei", elem, event);

        const openCards = document.getElementsByClassName("show");

        if (openCards.length === 2){
            compareClass(openCards);
            counter +=1;
        }

        const match = document.getElementsByClassName("match");
        if (match.length === 16){
            setTimeout(function(){
                congratMensage();
            }, 800);
        }
        console.log(match);
    }  
    
    
    
}
// Matching cards

function compareClass(array){

    const elem1 = array[0];
    const elem2 = array[1];

    const iconElem1 = elem1.firstElementChild.getAttribute("class");
    const iconElem2 = elem2.firstElementChild.getAttribute("class");

    if (iconElem1 === iconElem2){
        elem1.classList.remove("show");
        elem2.classList.remove("show");
        elem1.classList.add("match");
        elem2.classList.add("match");   
    }
    else{
        elem1.classList.add("error");
        elem2.classList.add("error");
        
        setTimeout(function(){
            elem1.classList.remove("open", "show", "error");
            elem2.classList.remove("open", "show", "error");
        }, 1000);
    }

}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function congratMensage() {
    const congratulations = document.createElement("div");
    congratulations.classList.add("congrat");
    congratulations.innerHTML = "<h2>Congratulations!</br>You Won!</h2>"
    
    return container.appendChild(congratulations);  
}