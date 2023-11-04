const canvas = document.getElementById("pingPong");
const ctx = canvas.getContext("2d");

// Paddle settings
const paddleWidth = 10;
const paddleHeight = 100;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 16;

// Ball settings
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Game variables
let player1Score = 0;
let player2Score = 0;

function draw() {
  // Clear the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = "white";
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  // Update ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collisions with top and bottom
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collisions with paddles
  if (
    (ballX - ballSize < paddleWidth &&
      ballY > player1Y &&
      ballY < player1Y + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
      ballY > player2Y &&
      ballY < player2Y + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Scoring
  if (ballX - ballSize < 0) {
    player2Score++;
    resetBall();
  } else if (ballX + ballSize > canvas.width) {
    player1Score++;
    resetBall();
  }

  // Update player2 paddle position (simple AI)
  if (ballY > player2Y + paddleHeight / 2) {
    player2Y += paddleSpeed;
  } else {
    player2Y -= paddleSpeed;
  }

  // Display scores
  ctx.font = "30px Arial";
  ctx.fillText(player1Score + " - " + player2Score, canvas.width / 2 - 30, 30);

  // Request animation frame
  requestAnimationFrame(draw);
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;
}

// Player control
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (player1Y > 0) {
        player1Y -= paddleSpeed;
      }
      break;
    case "ArrowDown":
      if (player1Y + paddleHeight < canvas.height) {
        player1Y += paddleSpeed;
      }
      break;
  }
});

// Start the game
resetBall();
draw();
