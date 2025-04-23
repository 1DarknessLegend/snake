const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const gameArea = document.getElementById('gameArea');

let tileCount = 20;
let tileSize = 20;
canvas.width = tileCount * tileSize;
canvas.height = tileCount * tileSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;
let speed = 100;
let interval = null;

function resetGame() {
  snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
  velocity = { x: 0, y: 0 };
  food = randomFood();
  score = 0;
  updateScore();
}

function updateScore() {
  scoreEl.textContent = `Очки: ${score}`;
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function drawGame() {
  ctx.fillStyle = getComputedStyle(canvas).backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);

  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize - 2, tileSize - 2);
  });

  moveSnake();
}

function moveSnake() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.some(p => p.x === head.x && p.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = randomFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  drawGame();
}

interval = setInterval(gameLoop, speed);

// Управление
document.getElementById('upBtn').addEventListener('click', () => { if (velocity.y === 0) velocity = { x: 0, y: -1 }; });
document.getElementById('downBtn').addEventListener('click', () => { if (velocity.y === 0) velocity = { x: 0, y: 1 }; });
document.getElementById('leftBtn').addEventListener('click', () => { if (velocity.x === 0) velocity = { x: -1, y: 0 }; });
document.getElementById('rightBtn').addEventListener('click', () => { if (velocity.x === 0) velocity = { x: 1, y: 0 }; });

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': if (velocity.y === 0) velocity = { x: 0, y: -1 }; break;
    case 'ArrowDown': if (velocity.y === 0) velocity = { x: 0, y: 1 }; break;
    case 'ArrowLeft': if (velocity.x === 0) velocity = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (velocity.x === 0) velocity = { x: 1, y: 0 }; break;
  }
});

// Настройки
settingsButton.addEventListener('click', () => {
  settingsMenu.classList.toggle('hidden');
});

document.getElementById('whiteBackground').addEventListener('click', () => {
  document.body.style.backgroundColor = 'white';
  document.body.style.color = 'black';
  gameArea.style.backgroundColor = 'white';
  canvas.style.backgroundColor = 'white';
  settingsMenu.style.backgroundColor = 'white';
  settingsMenu.style.borderColor = 'black';
});

document.getElementById('blackBackground').addEventListener('click', () => {
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  gameArea.style.backgroundColor = 'black';
  canvas.style.backgroundColor = '#111';
  settingsMenu.style.backgroundColor = '#111';
  settingsMenu.style.borderColor = 'white';
});

// Размер поля
function resizeField(size) {
  tileCount = size;
  canvas.width = tileCount * tileSize;
  canvas.height = tileCount * tileSize;
  resetGame();
}

document.getElementById('smallField').addEventListener('click', () => resizeField(15));
document.getElementById('mediumField').addEventListener('click', () => resizeField(20));
document.getElementById('largeField').addEventListener('click', () => resizeField(30));

// Скорость
document.getElementById('slowSpeed').addEventListener('click', () => {
  clearInterval(interval);
  speed = 200;
  interval = setInterval(gameLoop, speed);
});

document.getElementById('mediumSpeed').addEventListener('click', () => {
  clearInterval(interval);
  speed = 100;
  interval = setInterval(gameLoop, speed);
});

document.getElementById('fastSpeed').addEventListener('click', () => {
  clearInterval(interval);
  speed = 50;
  interval = setInterval(gameLoop, speed);
});

// Старт игры
resetGame();
