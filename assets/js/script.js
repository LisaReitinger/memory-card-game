/* global confetti */

// Selected DOM elements
const gameBoard = document.getElementById('gameBoard');
const startGameButton = document.getElementById('startGame');
const resetGameButton = document.getElementById('resetGame');
const hintButton = document.getElementById('hintButton');
const scoreElement = document.getElementById('score');
const failuresElement = document.getElementById('failures');
const animalsDeckButton = document.getElementById('animalsDeckButton');
const fruitsDeckButton = document.getElementById('fruitsDeckButton');
const difficultySelect = document.getElementById('difficulty');
const headerTitle = document.querySelector('header h1');
const instructions = document.querySelector('p.instructions');
const quitGameButton = document.getElementById('quitGameButton');
const quitModal = document.getElementById('quitModal');
const confirmQuitButton = document.getElementById('confirmQuit');
const cancelQuitButton = document.getElementById('cancelQuit');
const endGameModal = document.getElementById("endGameModal");
const tryAgainButton = document.getElementById("tryAgainButton");
const endGameButton = document.getElementById("endGameButton");

// Variables for game state
let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let failures = 0;
let deckType = 'animals';
let gameDifficulty = 'easy';
let gridSize = 4;
let showingHint = false;

// Deck Data
const decks = {
  animals: [{
      name: 'duck',
      image: 'assets/images/animals/duck.png'
    },
    {
      name: 'rabbit',
      image: 'assets/images/animals/rabbit.png'
    },
    {
      name: 'sheep',
      image: 'assets/images/animals/sheep.png'
    },
    {
      name: 'cow',
      image: 'assets/images/animals/cow.png'
    },
    {
      name: 'donkey',
      image: 'assets/images/animals/donkey.png'
    },
    {
      name: 'hen',
      image: 'assets/images/animals/hen.png'
    },
    {
      name: 'horse',
      image: 'assets/images/animals/horse.png'
    },
    {
      name: 'pig',
      image: 'assets/images/animals/pig.png'
    },
    {
      name: 'cat',
      image: 'assets/images/animals/cat.png'
    },
    {
      name: 'dog',
      image: 'assets/images/animals/dog.png'
    },
    {
      name: 'buffalo',
      image: 'assets/images/animals/buffalo.png'
    },
    {
      name: 'llama',
      image: 'assets/images/animals/llama.png'
    }
  ],
  fruits: [{
      name: 'pineapple',
      image: 'assets/images/fruits/pineapple.png'
    },
    {
      name: 'watermelon',
      image: 'assets/images/fruits/watermelon.png'
    },
    {
      name: 'cherries',
      image: 'assets/images/fruits/cherries.png'
    },
    {
      name: 'orange',
      image: 'assets/images/fruits/orange.png'
    },
    {
      name: 'apple',
      image: 'assets/images/fruits/apple.png'
    },
    {
      name: 'lemon',
      image: 'assets/images/fruits/lemon.png'
    },
    {
      name: 'strawberry',
      image: 'assets/images/fruits/strawberry.png'
    },
    {
      name: 'kiwi',
      image: 'assets/images/fruits/kiwi.png'
    },
    {
      name: 'banana',
      image: 'assets/images/fruits/banana.png'
    },
    {
      name: 'peach',
      image: 'assets/images/fruits/peach.png'
    },
    {
      name: 'blueberries',
      image: 'assets/images/fruits/blueberries.png'
    },
    {
      name: 'pear',
      image: 'assets/images/fruits/pear.png'
    }
  ]
};

// Initialize Game
function initializeGame() {
  score = 0;
  failures = 0;
  gameBoard.style.display = 'none';
  headerTitle.classList.remove('hidden');
  instructions.classList.remove('hidden');
  updateDifficulty();
  updateScore();
  updateFailures();
  hintButton.classList.add('hidden');
  resetGameButton.classList.add('hidden');
}

// Start Game
function startGame() {
  gameBoard.style.display = 'flex';
  headerTitle.classList.add('hidden'); // Hide header title
  instructions.classList.add('hidden'); // Hide instructions
  startGameButton.classList.add('hidden'); // Hide start button
  document.querySelector('.deck-selection').classList.add('hidden'); // Hide the Choose Card Deck section
  document.querySelector('.difficulty').classList.add('hidden'); // Hide the Difficulty dropdown
  quitGameButton.classList.remove('hidden'); // Show Quit Button
  updateDifficulty();
  setDeck(deckType);
  resetGame();
  hintButton.classList.remove('hidden');
  resetGameButton.classList.remove('hidden');
  createGameBoard();
}

// Reset Game
function resetGame() {
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCards = [];
  score = 0;
  failures = 0;
  updateScore();
  updateFailures();
  createGameBoard();
  shuffle(cards);
}

// Set Deck
function setDeck(type) {
  deckType = type;
  animalsDeckButton.classList.toggle('selected', type === 'animals');
  fruitsDeckButton.classList.toggle('selected', type === 'fruits');
  shuffle(cards);
}

// Update Difficulty
function updateDifficulty() {
  gameDifficulty = difficultySelect.value;
  if (gameDifficulty === 'easy') {
    gridSize = 4;
    cards = decks[deckType].slice(0, 8).concat(decks[deckType].slice(0, 8));
    hintButton.disabled = false; // Enable hint button
  } else if (gameDifficulty === 'hard') {
    gridSize = 5;
    cards = decks[deckType].slice(0, 10).concat(decks[deckType].slice(0, 10));
    hintButton.disabled = true; // Disable hint button
  }

  shuffle(cards);
  createGameBoard(); // Rebuild game board with updated cards
}

// Create Game Board
function createGameBoard() {
  gameBoard.innerHTML = '';
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.name = card.name;

    // Create the front of the card as an <img> element
    const front = document.createElement('div');
    front.classList.add('front');
    const cardImage = document.createElement('img'); // Create <img> tag for card image
    cardImage.src = card.image;
    cardImage.alt = card.name;
    front.appendChild(cardImage); // Append image to the front div

    const back = document.createElement('div');
    back.classList.add('back');

    cardElement.appendChild(front);
    cardElement.appendChild(back);
    cardElement.addEventListener('click', () => flipCard(cardElement));
    gameBoard.appendChild(cardElement);
  });
}

// Shuffle Cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Flip Card 
function flipCard(cardElement) {
  if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
    cardElement.classList.add('flipped');
    flippedCards.push(cardElement);

    if (flippedCards.length === 2 && !showingHint) {
      checkForMatch();
    }
  }
}

function unflipCards(cardOne, cardTwo) {
  cardOne.classList.remove('flipped');
  cardTwo.classList.remove('flipped');
}

// Check for Match
function checkForMatch() {
  const [cardOne, cardTwo] = flippedCards;
  if (cardOne.dataset.name === cardTwo.dataset.name) {
    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');
    matchedCards.push(cardOne, cardTwo);
    flippedCards = [];
    score++;
    updateScore();
    checkForWin();
  } else {
    failures++;
    updateFailures();
    setTimeout(() => {
      unflipCards(cardOne, cardTwo);
      flippedCards = [];
    }, 1000);
  }
}

// Check for Win
function checkForWin() {
  if (matchedCards.length === cards.length) {
    triggerConfetti();
  }
}

// Show End Game Modal
function showEndGameModal() {
  endGameModal.classList.add("show");
}

// Try Again Button Logic
tryAgainButton.addEventListener("click", () => {
  endGameModal.classList.remove("show");
  resetGame(); // Resets the current game
});

// End Game Button Logic
endGameButton.addEventListener("click", () => {
  endGameModal.classList.remove("show");
  location.reload();
});

// Function to trigger confetti //
function triggerConfetti() {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    showEndGameModal(); // Directly show the modal if reduced motion is preferred
    return;
  }

  const count = 200;
  const defaults = {
    origin: {
      y: 0.7
    }
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // Show end game modal after confetti animation
  setTimeout(() => {
    showEndGameModal();
  }, 3000);

}

// Update Score 
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Update Failures
function updateFailures() {
  failuresElement.textContent = `Failures: ${failures}`;
}

// Event Listeners
startGameButton.addEventListener('click', startGame);
resetGameButton.addEventListener('click', resetGame);
hintButton.addEventListener('click', showHint);
animalsDeckButton.addEventListener('click', () => setDeck('animals'));
fruitsDeckButton.addEventListener('click', () => setDeck('fruits'));
difficultySelect.addEventListener('change', () => {
  updateDifficulty();
  setDeck(deckType);
});

// Show Quit Modal
quitGameButton.addEventListener('click', () => {
  quitModal.classList.add('show');
});

// Confirm Quit
confirmQuitButton.addEventListener('click', () => {
  quitModal.classList.remove('show');
  location.reload();
});

// Cancel Quit
cancelQuitButton.addEventListener('click', () => {
  quitModal.classList.remove('show');
});

// Show Hint
function showHint() {
  if (showingHint) return; // Prevent multiple hints at the same time

  const unmatchedPairs = cards.filter(card =>
    ![...gameBoard.children].some(child =>
      child.dataset.name === card.name && child.classList.contains('flipped')
    )
  );

  if (unmatchedPairs.length === 0) return;

  // Randomly select a hint pair
  const hintCard = unmatchedPairs[Math.floor(Math.random() * unmatchedPairs.length)];
  const hintCards = [...gameBoard.children].filter(child =>
    child.dataset.name === hintCard.name && !child.classList.contains('matched')
  );

  if (hintCards.length === 2) {
    hintCards[0].classList.add('flipped');
    hintCards[1].classList.add('flipped');
    showingHint = true;

    setTimeout(() => {
      unflipCards(hintCards[0], hintCards[1]);
      showingHint = false;
    }, 3000);
  }
}

// Initialize Game
initializeGame();