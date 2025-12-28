const player = document.querySelector(".player");
const enemies = document.querySelectorAll(".enemy");
const scoreEl = document.getElementById("score");
const road = document.getElementById("road");
const gameOverBox = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let gameRunning = false;
let score = 0;
let speed = 4;
let enemyLoop, scoreLoop;

const lanes = [60, 140, 220];

/* KEYBOARD */
document.addEventListener("keydown", e => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

/* MOVE PLAYER */
function moveLeft() {
  let left = player.offsetLeft;
  if (left > 40) player.style.left = left - 30 + "px";
}

function moveRight() {
  let left = player.offsetLeft;
  if (left < 240) player.style.left = left + 30 + "px";
}

/* START GAME */
function startGame() {
  resetGame();
  gameRunning = true;
  road.classList.remove("paused");
  gameOverBox.style.display = "none";

  enemyLoop = setInterval(moveEnemies, 20);
  scoreLoop = setInterval(updateScore, 500);
}

/* PAUSE */
function pauseGame() {
  gameRunning = false;
  clearInterval(enemyLoop);
  clearInterval(scoreLoop);
  road.classList.add("paused");
}

/* RESUME */
function resumeGame() {
  if (gameRunning) return;
  gameRunning = true;
  road.classList.remove("paused");
  enemyLoop = setInterval(moveEnemies, 20);
  scoreLoop = setInterval(updateScore, 500);
}

/* MOVE ENEMIES */
function moveEnemies() {
  enemies.forEach(enemy => {
    let top = enemy.offsetTop;

    if (top > 520) {
      enemy.style.top = "-120px";
      enemy.style.left = lanes[Math.floor(Math.random() * lanes.length)] + "px";
    } else {
      enemy.style.top = top + speed + "px";
    }
    checkCollision(enemy);
  });
}

/* COLLISION */
function checkCollision(enemy) {
  const p = player.getBoundingClientRect();
  const e = enemy.getBoundingClientRect();

  if (
    p.left < e.right &&
    p.right > e.left &&
    p.top < e.bottom &&
    p.bottom > e.top
  ) {
    endGame();
  }
}

/* GAME OVER */
function endGame() {
  pauseGame();
  finalScore.innerText = score;
  gameOverBox.style.display = "flex";
}

/* SCORE */
function updateScore() {
  score++;
  scoreEl.innerText = score;
  if (score % 10 === 0) speed++;
}

/* RESET */
function resetGame() {
  score = 0;
  speed = 4;
  scoreEl.innerText = 0;
  player.style.left = "140px";

  enemies.forEach((enemy, i) => {
    enemy.style.top = -150 * (i + 1) + "px";
    enemy.style.left = lanes[Math.floor(Math.random() * lanes.length)] + "px";
  });
}

/* RESTART */
function restartGame() {
  startGame();
}
