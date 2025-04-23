const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const gameContainer = document.getElementById('gameContainer');

// Настройки поля
let tileCount = 20;
let tileSize = 20;
let canvasSize = tileCount * tileSize;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Змейка
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;
let speed = 200; // миллисекунды между кадрами
let interval = null;

// Функции игры
function resetGame() {
  snake = [{ x: Math.floor(tileCount/2), y: Math.floor(tileCount/2) }];
  velocity = { x: 0, y: 0 };
  food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
  score = 0;
  updateScore();
}

function updateScore() {
  scoreEl.textContent = `Очки: ${score}`;
}

function drawGame() {
  ctx.fillStyle = document.body.style.backgroundColor === 'white' ? '#fff' : '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Еда
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // Змейка
  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize - 2, tileSize - 2);
  });

  moveSnake();

  setTimeout(drawGame, speed);
}

function moveSnake() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // Столкновение с краем
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
    return;
  }

  // Столкновение с собой
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  // Поедание еды
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
  } else {
    snake.pop();
  }
}

// Управление
document.getElementById('upBtn').addEventListener('click', () => {
  if (velocity.y === 0) velocity = { x: 0, y: -1 };
});
document.getElementById('downBtn').addEventListener('click', () => {
  if (velocity.y === 0) velocity = { x: 0, y: 1 };
});
document.getElementById('leftBtn').addEventListener('click', () => {
  if (velocity.x === 0) velocity = { x: -1, y: 0 };
});
document.getElementById('rightBtn').addEventListener('click', () => {
  if (velocity.x === 0) velocity = { x: 1, y: 0 };
});

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
  }
});

// Меню настроек
settingsButton.addEventListener('click', () => {
  settingsMenu.classList.toggle('hidden');
});

// Белый/черный фон
document.getElementById('whiteBackground').addEventListener('click', () => {
  document.body.style.backgroundColor = 'white';
  document.body.style.color = 'black';
  gameContainer.style.border = '2px solid black';
  settingsMenu.style.backgroundColor = '#fff';
  settingsMenu.style.borderColor = 'black';
});

document.getElementById('blackBackground').addEventListener('click', () => {
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  gameContainer.style.border = '2px solid white';
  settingsMenu.style.backgroundColor = '#111';
  settingsMenu.style.borderColor = 'white';
});

// Размеры поля
document.getElementById('smallField').addEventListener('click', () => {
  tileCount = 15;
  resizeCanvas();
});

document.getElementById('mediumField').addEventListener('click', () => {
  tileCount = 20;
  resizeCanvas();
});

document.getElementById('largeField').addEventListener('click', () => {
  tileCount = 30;
  resizeCanvas();
});

function resizeCanvas() {
  tileSize = Math.floor(window.innerWidth / tileCount / 2);
  canvas.width = tileCount * tileSize;
  canvas.height = tileCount * tileSize;
  resetGame();
}

// Скорости
document.getElementById('slowSpeed').addEventListener('click', () => {
  speed = 300;
});

document.getElementById('mediumSpeed').addEventListener('click', () => {
  speed = 200;
});

document.getElementById('fastSpeed').addEventListener('click', () => {
  speed = 100;
});

// Запуск игры
resetGame();
drawGame();
