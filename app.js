let score = 0;
let lives = 4;
let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');

// Generate game cards
for (let i = 0; i < 8; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.innerHTML = i % 2 === 0? '&#9829;' : '&#9733;';
    card.appendChild(cardFront);
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = ''; /* Add a blank back side */
    card.appendChild(cardBack);
    card.dataset.value = i % 2 === 0? 'heart' : 'star';
    gameBoard.appendChild(card);
  }

// Add event listener to cards
gameBoard.addEventListener('click', (event) => {
    if (event.target.classList.contains('card')) {
        const card = event.target;
        flipCard(card);
    }
});

// Flip card function
function flipCard(card) {
    card.classList.toggle('flip');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

// Check match function
function checkMatch() {
    setTimeout(() => {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];
      if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        score++;
        scoreElement.textContent = `Score: ${score}`;
      } else {
        lives--;
        livesElement.textContent = `Lives: ${lives}`;
        if (lives === 0) {
          alert('Game Over!');
        }
      }
      flippedCards.forEach((card) => card.classList.remove('flip'));
      flippedCards = [];
    }, 1000);
  }
