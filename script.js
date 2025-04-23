const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let box = 20;
let snake = [];
let direction = 'RIGHT';
let food;
let score = 0;
let settingsMenuVisible = false;
let queuedDirection = null;

// --- ИНИЦИАЛИЗАЦИЯ ---
initSnake();
food = spawnFood();
document.getElementById('score').innerText = `Очки: ${score}`;

function initSnake() {
  snake = [{ 
    x: Math.floor((canvas.width / 2) / box) * box, 
    y: Math.floor((canvas.height / 2) / box) * box 
  }];
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

// Управление
document.addEventListener('keydown', event => queueDirection(event.key));
document.getElementById('up').addEventListener('click', () => queueDirection('ArrowUp'));
document.getElementById('down').addEventListener('click', () => queueDirection('ArrowDown'));
document.getElementById('left').addEventListener('click', () => queueDirection('ArrowLeft'));
document.getElementById('right').addEventListener('click', () => queueDirection('ArrowRight'));

function queueDirection(key) {
  queuedDirection = key;
}

function changeDirection() {
  if (!queuedDirection) return;
  if (queuedDirection === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  else if (queuedDirection === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  else if (queuedDirection === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  else if (queuedDirection === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  queuedDirection = null;
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'lime' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  drawEyes();
}

function drawEyes() {
  const head = snake[0];
  ctx.fillStyle = 'black';

  let eyeOffsetX = 0;
  let eyeOffsetY = 0;
  
  if (direction === 'UP') { eyeOffsetY = -5; }
  if (direction === 'DOWN') { eyeOffsetY = 5; }
  if (direction === 'LEFT') { eyeOffsetX = -5; }
  if (direction === 'RIGHT') { eyeOffsetX = 5; }

  ctx.beginPath();
  ctx.arc(head.x + box / 3 + eyeOffsetX, head.y + box / 3 + eyeOffsetY, 3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(head.x + box * 2/3 + eyeOffsetX, head.y + box / 3 + eyeOffsetY, 3, 0, 2 * Math.PI);
  ctx.fill();
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  changeDirection();

  drawSnake();
  drawFood();

  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'RIGHT') head.x += box;

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head, snake)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
    score++;
    document.getElementById('score').innerText = `Очки: ${score}`;
  } else {
    snake.pop();
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  initSnake();
  direction = 'RIGHT';
  food = spawnFood();
  score = 0;
  document.getElementById('score').innerText = `Очки: ${score}`;
}

setInterval(update, 100);

// Настройки
document.getElementById('settingsButton').addEventListener('click', () => {
  settingsMenuVisible = !settingsMenuVisible;
  document.getElementById('settingsMenu').style.display = settingsMenuVisible ? 'block' : 'none';
});

function setTheme(color) {
  const buttons = document.querySelectorAll('button');
  
  if (color === 'white') {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    canvas.style.backgroundColor = '#eee';
    canvas.style.borderColor = 'black'; // <-- добавлено
    document.getElementById('gameContainer').style.backgroundColor = 'white';
    document.getElementById('gameContainer').style.borderColor = 'black';
    document.getElementById('settingsMenu').style.backgroundColor = 'white';
    document.getElementById('settingsMenu').style.color = 'black';
    buttons.forEach(btn => {
      btn.style.backgroundColor = 'white';
      btn.style.color = 'black';
      btn.style.borderColor = 'black';
    });
  } else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    canvas.style.backgroundColor = '#111';
    canvas.style.borderColor = 'white'; // <-- добавлено
    document.getElementById('gameContainer').style.backgroundColor = '#111';
    document.getElementById('gameContainer').style.borderColor = 'white';
    document.getElementById('settingsMenu').style.backgroundColor = '#222';
    document.getElementById('settingsMenu').style.color = 'white';
    buttons.forEach(btn => {
      btn.style.backgroundColor = '#333';
      btn.style.color = 'white';
      btn.style.borderColor = 'white';
    });
  }
}

function setFieldSize(size) {
  if (size === 'small') {
    canvas.width = 200;
    canvas.height = 200;
  } else if (size === 'medium') {
    canvas.width = 300;
    canvas.height = 300;
  } else if (size === 'large') {
    canvas.width = 400;
    canvas.height = 400;
  }
  resetGame();
}