const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

ctx.fillStyle = 'red';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

let x = 0;
let y = 0;
canvas.addEventListener('mousemove', (e) => {
  x = e.clientX;
  y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = 'red';
  ctx.fillRect(x - 50, y - 50, 100, 100);
  requestAnimationFrame(draw);
}

draw();