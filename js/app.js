
const container = document.querySelector(".container");
moves = 0;
let list;
let time1;
let totalTime;
let intervalToken;
const timer = document.getElementById("timer");


//List of cards

setupGame();
                  
function setupGame() {
    
    creatingDeck();
    definingImages();
   
    const cards = document.getElementsByClassName("card");
    for (elem of cards) { 
        elem.onclick = function (event) {
            
            const openCards = document.getElementsByClassName("show");
            if(openCards.length === 2){
                return;
            }
            event.target.classList.add("open", "show");

            setupMoves();
           
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
                clearInterval(intervalToken);
                setTimeout(function () {
                    congratMessage();
                }, 700);
            }
            scoreDown();
            //countingMoves(moves);

            const reseting = document.getElementById("restart");
            reset(reseting, null);
        };
    }
}


function creatingDeck(){
    if (list){
        container.removeChild(list);   
        clearInterval(intervalToken);  
        timer.textContent = null;
    }

    list = document.createElement("ul");
    list.classList.add("deck");
    container.appendChild(list);
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
function definingImages(){
    const classIcons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", 
                    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

    setupImages(shuffle(classIcons));
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

// Timer

function setupTimer(){
    timer.textContent = `Timer: ${0}`;
    return setInterval(function(){
        let time2 = new Date(); 
        const diff = time2.getTime() - time1.getTime();
        totalTime = Math.floor(diff/1000);
        timer.textContent = `Timer: ${totalTime}`;

    }, 1000);
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
        return true;  
    
    }
    else{
        elem1.classList.add("error");
        elem2.classList.add("error");
        
        setTimeout(function(){

            elem1.classList.remove("open", "show", "error");
            elem2.classList.remove("open", "show", "error");
        }, 1000);
        return false;
    }
}


function setupMoves(){
    moves += 1;
    if (moves === 1) {
        time1 = new Date();
        intervalToken = setupTimer();
    }

    countingMoves(moves);
}

// Score Painel

 function countingMoves(el){
    const moving = document.getElementById("moves");
    return moving.textContent = `${el} moves`;
 }
 
const score = document.getElementsByClassName("fa-star");
const lastStar = score[score.length-1];

function starScore(){
    const score = document.getElementsByClassName("fa-star");
    const lastStar = score[score.length-1];
    
    lastStar.classList.remove("fa-star")
    lastStar.classList.add("fa-star-o");   
}

function starScoreReset(){
    const score = document.getElementsByClassName("fa-star-o");
    while(score.length > 0){
        const elem = score[0];
        elem.classList.remove("fa-star-o")
        elem.classList.add("fa-star");
    }
}
let starResult;

function showStar(){
    const score = document.getElementsByClassName("fa-star");
    starResult = score.length;
    if (score.length>=2){
        return `${score.length} stars`;

    } else if (score.length = 1){
        return "1 star";
    } else{
        return "0 star";
    }
}

function phrase(){
    switch(starResult){
        case 0:
            return "That's a shame! Try again! :)";
        case 1:
            return "Could be better, try again! :)";
        case 2: 
            return "Not so bad! :)";
        case 3: 
            return "Amazing!";
    }
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

// Reset

function reset(elem, remove){
    
    elem.onclick = function(){
        moves = 0;
        setupGame(); 
        countingMoves(moves);
        starScoreReset();
        if (remove != null){
            container.removeChild(remove);
        }
    }
}

// Congratulation message
function congratMessage() {
    const congratulations = document.createElement("div");
    congratulations.classList.add("congrat");
    congratulations.innerHTML = "<h2>Congratulations!</br>You Won!</h2>";
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    h3.textContent = `with ${moves} moves and ${showStar()}`
    h4.textContent = `Time: ${totalTime} seconds`;
    h5.textContent = `${phrase()}`;
    congratulations.appendChild(h3);
    congratulations.appendChild(h4);
    congratulations.appendChild(h5);

    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = "Play again!"
    congratulations.appendChild(button);
    reset(button, congratulations);
    
    return container.appendChild(congratulations);     
}