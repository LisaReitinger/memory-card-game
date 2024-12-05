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
    animals: [
      { name: 'duck', image: 'assets/images/animals/duck.png' },
      { name: 'rabbit', image: 'assets/images/animals/rabbit.png' },
      { name: 'sheep', image: 'assets/images/animals/sheep.png' },
      { name: 'cow', image: 'assets/images/animals/cow.png' },
      { name: 'donkey', image: 'assets/images/animals/donkey.png' },
      { name: 'hen', image: 'assets/images/animals/hen.png' },
      { name: 'horse', image: 'assets/images/animals/horse.png' },
      { name: 'pig', image: 'assets/images/animals/pig.png' },
      { name: 'cat', image: 'assets/images/animals/cat.png' },
      { name: 'dog', image: 'assets/images/animals/dog.png' },
      { name: 'buffalo', image: 'assets/images/animals/buffalo.png' },
      { name: 'llama', image: 'assets/images/animals/llama.png' }
    ],
    fruits: [
      { name: 'pineapple', image: 'assets/images/fruits/pineapple.png' },
      { name: 'watermelon', image: 'assets/images/fruits/watermelon.png' },
      { name: 'cherries', image: 'assets/images/fruits/cherries.png' },
      { name: 'orange', image: 'assets/images/fruits/orange.png' },
      { name: 'apple', image: 'assets/images/fruits/apple.png' },
      { name: 'lemon', image: 'assets/images/fruits/lemon.png' },
      { name: 'strawberry', image: 'assets/images/fruits/strawberry.png' },
      { name: 'kiwi', image: 'assets/images/fruits/kiwi.png' },
      { name: 'banana', image: 'assets/images/fruits/banana.png' },
      { name: 'peach', image: 'assets/images/fruits/peach.png' },
      { name: 'blueberries', image: 'assets/images/fruits/blueberries.png' },
      { name: 'pear', image: 'assets/images/fruits/pear.png' }
    ]
  };
  
// Initialize Game
function initializeGame() {
    updateDifficulty();
    updateScore();
    updateFailures();
    hintButton.classList.add('hidden');
    resetGameButton.classList.add('hidden');
}

// Start Game
function startGame() {
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
    gridSize = gameDifficulty === 'easy' ? 4 : gameDifficulty === 'medium' ? 5 : 6;
    gameBoard.className = `game-board ${gameDifficulty}`;
}

// Create Game Board
function createGameBoard() {
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.style.backgroundImage = `url(${card.image})`;
  
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

// Update Score 
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Update Failures
function updateFailures() {
  failuresElement.textContent = `Failures: ${failures}`;
}

startGameButton.addEventListener('click', startGame);
// Initialize Game
initializeGame();


