// Selected DOM elements
const gameBoard = document.hetElementById('gameBoard');
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

