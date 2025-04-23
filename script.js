const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let boxSize = 20;
let fieldSize = 20;
let speed = 100;
let snake = [];
let direction = 'right';
let food = {};
let darkTheme = true;
let score = 0;
let intervalId = null;

resizeCanvas();
initGame();

function resizeCanvas() {
  canvas.width = fieldSize * boxSize;
  canvas.height = fieldSize * boxSize;
}

function initGame() {
  snake = [{ x: Math.floor(fieldSize/2), y: Math.floor(fieldSize/2) }];
  generateFood();
  score = 0;
  updateScore();
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(updateGame, speed);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * fieldSize),
    y: Math.floor(Math.random() * fieldSize)
  };
}

function updateScore() {
  document.getElementById('score').innerText = `Очки: ${score}`;
}

function updateGame() {
  moveSnake();
  if (checkCollision()) {
    initGame();
  }
  draw();
}

function moveSnake() {
  let head = { ...snake[0] };
  
  if (direction === 'left') head.x--;
  if (direction === 'right') head.x++;
  if (direction === 'up') head.y--;
  if (direction === 'down') head.y++;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    generateFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = darkTheme ? '#111' : '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Еда
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

  // Змейка
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'lime' : 'green';
    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    if (index === 0) {
      // глазки
      ctx.fillStyle = 'black';
      ctx.fillRect(segment.x * boxSize + 5, segment.y * boxSize + 5, 4, 4);
      ctx.fillRect(segment.x * boxSize + 11, segment.y * boxSize + 5, 4, 4);
    }
  });
}

function move(dir) {
  if ((dir === 'left' && direction !== 'right') ||
      (dir === 'right' && direction !== 'left') ||
      (dir === 'up' && direction !== 'down') ||
      (dir === 'down' && direction !== 'up')) {
    direction = dir;
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.y < 0 || head.x >= fieldSize || head.y >= fieldSize) return true;
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) return true;
  }
  return false;
}

// Темы
function setTheme(theme) {
  if (theme === 'white') {
    darkTheme = false;
    document.body.style.background = '#fff';
    document.body.style.color = '#000';
    canvas.style.background = '#fff';
    canvas.style.border = '2px solid black';
    document.querySelectorAll('button').forEach(btn => {
      btn.style.background = '#fff';
      btn.style.color = '#000';
      btn.style.border = '2px solid black';
    });
  } else {
    darkTheme = true;
    document.body.style.background = '#111';
    document.body.style.color = 'white';
    canvas.style.background = '#111';
    canvas.style.border = '2px solid white';
    document.querySelectorAll('button').forEach(btn => {
      btn.style.background = '#111';
      btn.style.color = 'white';
      btn.style.border = '2px solid white';
    });
  }
}

// Размер поля
function setFieldSize(size) {
  if (size === 'small') fieldSize = 15;
  if (size === 'medium') fieldSize = 20;
  if (size === 'large') fieldSize = 30;
  resizeCanvas();
  initGame();
}

// Скорость игры
function setSpeed(level) {
  if (level === 'slow') speed = 200;
  if (level === 'medium') speed = 100;
  if (level === 'fast') speed = 50;
  initGame();
}

// Меню настроек
function toggleSettings() {
  const menu = document.getElementById('settingsMenu');
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}
