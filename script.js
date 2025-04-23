const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const boxSize = 20;
let fieldSize = 20;
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;

function initGame() {
  canvas.width = fieldSize * boxSize;
  canvas.height = fieldSize * boxSize;
  snake = [{ x: Math.floor(fieldSize/2), y: Math.floor(fieldSize/2) }];
  spawnFood();
  dx = 0;
  dy = 0;
  score = 0;
  document.getElementById('score').textContent = 'Очки: ' + score;
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(draw, 100);
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * fieldSize),
    y: Math.floor(Math.random() * fieldSize)
  };
}

function draw() {
  ctx.fillStyle = canvas.style.backgroundColor || '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let part of snake) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(part.x * boxSize, part.y * boxSize, boxSize-2, boxSize-2);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize-2, boxSize-2);

  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x < 0 || head.y < 0 || head.x >= fieldSize || head.y >= fieldSize || collision(head)) {
    initGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    spawnFood();
    score++;
    document.getElementById('score').textContent = 'Очки: ' + score;
  } else {
    snake.pop();
  }
}

function collision(head) {
  return snake.some(part => part.x === head.x && part.y === head.y);
}

document.getElementById('up').addEventListener('click', () => { if (dy === 0) {dx = 0; dy = -1;} });
document.getElementById('down').addEventListener('click', () => { if (dy === 0) {dx = 0; dy = 1;} });
document.getElementById('left').addEventListener('click', () => { if (dx === 0) {dx = -1; dy = 0;} });
document.getElementById('right').addEventListener('click', () => { if (dx === 0) {dx = 1; dy = 0;} });

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
  if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
  if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
  if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
});

document.getElementById('settingsButton').addEventListener('click', () => {
  const menu = document.getElementById('settingsMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

function setTheme(color) {
  const buttons = document.querySelectorAll('button');

  if (color === 'white') {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    canvas.style.backgroundColor = '#eee';
    canvas.style.borderColor = 'black';
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
    canvas.style.borderColor = 'white';
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
    fieldSize = 15;
  } else if (size === 'medium') {
    fieldSize = 20;
  } else if (size === 'large') {
    fieldSize = 30;
  }
  
  canvas.width = fieldSize * boxSize;
  canvas.height = fieldSize * boxSize;
  initGame(); // Полностью перезапуск игры
}
initGame();
