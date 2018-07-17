//List of cards

const container = document.querySelector(".container");
moves = 0;
counter = 0;

const list = document.createElement("ul");
list.classList.add("deck");
container.appendChild(list);

const classIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", 
                    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

setupImages(shuffle(classIcons));
const cards = document.getElementsByClassName("card");

for (elem of cards){
    elem.onclick = function(event){
        event.target.classList.add("open", "show");
        moves+=1;
        const openCards = document.getElementsByClassName("show");

        if (openCards.length === 2){
            compareClass(openCards);
        }

        const match = document.getElementsByClassName("match");
        if (match.length === 16){
            setTimeout(function(){
                congratMensage();
            }, 800);
        }
       scoreDown();
       countingMoves(moves);
    }  
setupGame();
                  
function setupGame() {
    
    if (list){
        container.removeChild(list);     
    }

    list = document.createElement("ul");
    list.classList.add("deck");
    container.appendChild(list);

    setupImages(shuffle(classIcons));

    const cards = document.getElementsByClassName("card");
    for (elem of cards) {
        elem.onclick = function (event) {
            event.target.classList.add("open", "show");
            
            moves += 1;
            if (moves === 1) {
                time1 = new Date();
                console.log("começou");
            }
            const openCards = document.getElementsByClassName("show");
            if (openCards.length === 2) {
                if (compareClass(openCards)){
                    const match = document.getElementsByClassName("match");
                    for (elem of match){
                        elem.onclick = null;
                    }
                }
            }
            const match = document.getElementsByClassName("match");
            if (match.length === 16) {
                time2 = new Date(); 
                const diff = time2.getTime() - time1.getTime();
                finalTime = Math.ceil(diff/1000);
                
                console.log("TEMPO: " + diff/1000)
                setTimeout(function () {
                    congratMensage();
                }, 700);
            }
            scoreDown();
            countingMoves(moves);
            reset(reseting);
        };
    }
}

// Defining card images

function setupImages (array){
    for (let i= 0; i<array.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");
        list.appendChild(card);
        const icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add(array[i]);
        card.appendChild(icon);
    
    }
}

// Shuffle the cards

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

// Score Painel

 function countingMoves(el){
    const moving = document.getElementById("moves");
    return moving.textContent = `${el} moves`;
 }
 
 
const score = document.getElementsByClassName("fa-star");
const lastStar = score[score.length-1];

console.log(lastStar);

function starScore(){
    const score = document.getElementsByClassName("fa-star");
    const lastStar = score[score.length-1];
    
    lastStar.classList.remove("fa-star")
    lastStar.classList.add("fa-star-o");

}

function scoreDown(){
    switch(moves){
        case 30:
        case 35:
        case 40:
            starScore();
            break;
    }
}

// Congratulation mensage

function congratMensage() {
    const congratulations = document.createElement("div");
    congratulations.classList.add("congrat");
    congratulations.innerHTML = "<h2>Congratulations!</br>You Won!</h2>"
    
    return container.appendChild(congratulations);  
}