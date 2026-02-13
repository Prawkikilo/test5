var images = [
  { img: "ภูมิคุ้มกันword.png", pair: 1 },
  { img: "ภูมิคุ้มกันdescribe.png", pair: 1 },
  { img: "antibodyword.png", pair: 2 },
  { img: "antibodydescribe.png", pair: 2 },
  { img: "antigenword.png", pair: 3 },
  { img: "antigendescribe.png", pair: 3 },
  { img: "whitecellword.png", pair: 4 },
  { img: "whitecelldescribe.png", pair: 4 },
  { img: "phagocyteword.png", pair: 5 },
  { img: "phagocytedescribe.png", pair: 5 },
  { img: "lymphocyteword.png", pair: 6 }, 
  { img: "lymphocytedescribe.png", pair: 6 }, 
  { img: "Bcellword.png", pair: 7 },
  { img: "Bcelldescribe.png", pair: 7 },
  { img: "Tcellword.png", pair: 8 },
  { img: "Tcelldescribe.png", pair: 8 },
  { img: "ไม่จำเพาะword.png", pair: 9 },
  { img: "ไม่จำเพาะdescribe.png", pair: 9 },
  { img: "จำเพาะword.png", pair: 10 },
  { img: "จำเพาะdescribe.png", pair: 10 },
  { img: "Macroword.png", pair: 11 },
  { img: "Macrodescribe.png", pair: 11 },  
  { img: "vaccineword.png", pair: 12 },
  { img: "vaccinedescribe.png", pair: 12 }

]; // Add image URLs here
var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;

function startGame() {
    var gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";


    var cardImages = [...images]; // Duplicate images for pairs
    cardImages.sort(() => Math.random() - 0.5);

for (var i = 0; i < cardImages.length; i++) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-front"><i class="fas fa-heart"></i></div>
        <div class="card-back">
            <img src="${cardImages[i].img}">
        </div>
    `;
    card.onclick = flipCard;
    card.dataset.pair = cardImages[i].pair;
    gameBoard.appendChild(card);
}


    firstCard = null;
    secondCard = null;
    canFlip = true;
    matches = 0;
    moves = 0;
    seconds = 0;
    timerRunning = false;

    updateStats();
    clearInterval(timerInterval);


}
function flipCard() {
    if (!canFlip) return;

    if(this.classList.contains("flipped")) return;
    if(this.classList.contains("matched")) return;

    if(!timerRunning) {
        startTimer();
    }
    this.classList.add("flipped");
    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        moves++;
        updateStats();
        checkMatch();

    }
}
function checkMatch() {
    var match = firstCard.dataset.pair === secondCard.dataset.pair;
    if (match) {
        setTimeout(() => {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            matches++;
            updateStats();
            resetCards();
            if (matches === 12) {
                endgame();
            }
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}
function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(() => {
        seconds++;
        updateStats();
    }, 1000);
}
function updateStats() {
    document.getElementById("moves").innerText = moves;
    document.getElementById("matches").innerText = matches + "/12";

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    if(secs < 10) secs = '0' + secs;
    document.getElementById("time").textContent = mins + ":" + secs;
}
function endgame() {
    clearInterval(timerInterval);
    document.getElementById("finalMoves").textContent = moves;
    document.getElementById("finalTime").textContent = 
        document.getElementById("time").textContent;
        document.getElementById("winModal").classList.add("show");

}
function newGame() {
    document.getElementById("winModal").classList.remove("show");
    clearInterval(timerInterval);
    startGame();
}
startGame() 











































