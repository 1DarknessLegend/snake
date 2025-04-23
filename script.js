const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');

const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const whiteBgBtn = document.getElementById('whiteBgBtn');
const blackBgBtn = document.getElementById('blackBgBtn');
const smallFieldBtn = document.getElementById('smallFieldBtn');
const mediumFieldBtn = document.getElementById('mediumFieldBtn');
const largeFieldBtn = document.getElementById('largeFieldBtn');
const slowSpeedBtn = document.getElementById('slowSpeedBtn');
const mediumSpeedBtn = document.getElementById('mediumSpeedBtn');
const fastSpeedBtn = document.getElementById('fastSpeedBtn');

let box = 20;
let speed = 100;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 1;
let dy = 0;
let score = 0;
let interval;

function startGame() {
  clearInterval(interval);
  interval = setInterval(draw, speed);
}

function draw() {
  ctx.fillStyle = canvas.style.background || "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let part of snake) {
    ctx.fillStyle = "lime";
    ctx.fillRect(part.x * box, part.y * box, box, box);
  }

  // Рисуем глазки
  let head = snake[0];
  ctx.fillStyle = "black";
  ctx.fillRect(head.x * box + 5, head.y * box + 5, 5, 5);
  ctx.fillRect(head.x * box + 10, head.y * box + 5, 5, 5);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);

  let newHead = {x: head.x + dx, y: head.y + dy};

  if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width/box || newHead.y >= canvas.height/box || snake.some(p => p.x === newHead.x && p.y === newHead.y)) {
    resetGame();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box))
    };
    score++;
    scoreDisplay.textContent = `Очки: ${score}`;
  } else {
    snake.pop();
  }
}

function resetGame() {
  snake = [{x: 10, y: 10}];
  dx = 1;
  dy = 0;
  score = 0;
  scoreDisplay.textContent = "Очки: 0";
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)),
    y: Math.floor(Math.random() * (canvas.height / box))
  };
}

document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowUp" && dy === 0) {dx = 0; dy = -1;}
  if (e.key === "ArrowDown" && dy === 0) {dx = 0; dy = 1;}
  if (e.key === "ArrowLeft" && dx === 0) {dx = -1; dy = 0;}
  if (e.key === "ArrowRight" && dx === 0) {dx = 1; dy = 0;}
});

upBtn.addEventListener('click', () => { if (dy === 0) {dx = 0; dy = -1;} });
downBtn.addEventListener('click', () => { if (dy === 0) {dx = 0; dy = 1;} });
leftBtn.addEventListener('click', () => { if (dx === 0) {dx = -1; dy = 0;} });
rightBtn.addEventListener('click', () => { if (dx === 0) {dx = 1; dy = 0;} });

settingsButton.addEventListener('click', () => {
  settingsMenu.classList.toggle('hidden');
});

whiteBgBtn.addEventListener('click', () => {
  document.body.style.background = "white";
  document.body.style.color = "black";
  canvas.style.background = "white";
});

blackBgBtn.addEventListener('click', () => {
  document.body.style.background = "black";
  document.body.style.color = "white";
  canvas.style.background = "black";
});

smallFieldBtn.addEventListener('click', () => {
  canvas.width = 200;
  canvas.height = 200;
});

mediumFieldBtn.addEventListener('click', () => {
  canvas.width = 400;
  canvas.height = 400;
});

largeFieldBtn.addEventListener('click', () => {
  canvas.width = 600;
  canvas.height = 600;
});

slowSpeedBtn.addEventListener('click', () => {
  speed = 150;
  startGame();
});

mediumSpeedBtn.addEventListener('click', () => {
  speed = 100;
  startGame();
});

fastSpeedBtn.addEventListener('click', () => {
  speed = 50;
  startGame();
});

// Начало
canvas.width = 400;
canvas.height = 400;
startGame();
