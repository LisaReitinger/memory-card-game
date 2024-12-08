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
const tutorialModal = document.getElementById('tutorialModal');
const closeModal = document.getElementById('closeModal');
const fireworksCanvas = document.getElementById('fireworks');
const headerTitle = document.querySelector('header h1');
const instructions = document.querySelector('p.instructions');


// Variables for game state
let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let failures = 0;
let deckType = 'animals';
let gameDifficulty = 'easy';
let gridSize = 4;

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
  headerTitle.classList.remove('hidden'); // Ensure header is visible on reset
  instructions.classList.remove('hidden'); // Ensure instructions are visible on reset
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
}

// Set Deck
function setDeck(type) {
  deckType = type;
  animalsDeckButton.classList.toggle('selected', type === 'animals');
  fruitsDeckButton.classList.toggle('selected', type === 'fruits');
  cards = [...decks[type], ...decks[type]];
  cards = cards.slice(0, gridSize * gridSize / 2).concat(cards.slice(0, gridSize * gridSize / 2));
  shuffle(cards);
}

// Update Difficulty
function updateDifficulty() {
  gameDifficulty = difficultySelect.value;
  if (gameDifficulty === 'easy') {
    cards = decks[deckType].slice(0, 8).concat(decks[deckType].slice(0, 8)); // 16 cards (4x4)
  } else if (gameDifficulty === 'hard') {
    cards = decks[deckType].slice(0, 10).concat(decks[deckType].slice(0, 10)); // 20 cards (4x5)
  }
  
  shuffle(cards);
  createGameBoard(); // Rebuild game board with updated cards
}

// Create Game Board
function createGameBoard() {
  gameBoard.innerHTML = '';
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
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

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
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
      cardOne.classList.remove('flipped');
      cardTwo.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Check for Win
function checkForWin() {
  if (matchedCards.length === cards.length) {
    triggerVictoryAnimation();
  }
}

// Update Score 
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Update Failures
function updateFailures() {
  failuresElement.textContent = `Failures: ${failures}`;
}

// Trigger Victory Animation
function triggerVictoryAnimation() {
  // Placeholder for particle animation or fireworks effect
  console.log('Congratulations! You matched all cards!');
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
closeModal.addEventListener('click', () => {
  tutorialModal.style.display = 'none';
});

// Show Hint
function showHint() {
  let matchedPairs = 0;
  cards.forEach(card => {
    const cardElements = [...gameBoard.children].filter(child => child.dataset.name === card.name && !child.classList.contains('matched'));
    if (matchedPairs < 2 && cardElements.length === 2) {
      cardElements[0].classList.add('flipped');
      cardElements[1].classList.add('flipped');
      matchedPairs++;
    }
  });
  setTimeout(() => {
    cards.forEach(card => {
      const cardElements = [...gameBoard.children].filter(child => child.dataset.name === card.name && !child.classList.contains('matched'));
      cardElements.forEach(cardElement => cardElement.classList.remove('flipped'));
    });
  }, 3000);
}

// Initialize Game
initializeGame();