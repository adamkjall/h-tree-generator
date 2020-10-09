const canvas = document.querySelector(".canvas");
const generateButton = document.querySelector(".generate-tree-btn");
const randomColorButton = document.querySelector(".random-color");
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const color3Input = document.getElementById("color3");
const leafSizeInput = document.getElementById("leafSize");
const branchWidthInput = document.getElementById("branchWidth");
const curveInput = document.getElementById("curve");
const heightInput = document.getElementById("height");
const densityInput = document.getElementById("density");
const splitsInput = document.getElementById("splits");
const branchOffsetInput = document.getElementById("branchOffset");

const toggleGlowInput = document.querySelector(".switch .toggle-slider");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let color1 = randomHexColor();
let color2 = randomHexColor();
let color3 = randomHexColor();
let hasGlow = false;

let leafSize = +leafSizeInput.value || 10;
let branchWidth = +branchWidthInput.value || 10;
let angle = 0;
let len = +heightInput.value || 120;
let density = +densityInput.value || 15;
let splits = +splitsInput.value || 2;
let curve = +curveInput.value || 10;
let branchOffset = +branchOffsetInput || 10;

color1Input.value = color1;
color2Input.value = color2;
color3Input.value = color3;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  if (hasGlow) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = color3;
  }
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  if (angle > 0) {
    ctx.bezierCurveTo(10, -len / 2, curve, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(10, -len / 2, -curve, -len / 2, 0, -len);
  }
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (Number(len) < Number(density)) {
    ctx.beginPath();
    ctx.arc(0, -len, leafSize, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  //   setTimeout(() => {
  const offset = Math.random() * 10 + branchOffset;
  const angle1 = angle - 2 * offset;
  const angle2 = angle - offset;
  const angle3 = angle;
  const angle4 = angle + offset;
  const angle5 = angle + 2 * offset;

  switch (splits) {
    case 1:
      drawTree(0, -len, len * 0.75, angle3, branchWidth * 0.6);
      break;
    case 2:
      drawTree(0, -len, len * 0.75, angle2, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle4, branchWidth * 0.6);
      break;
    case 3:
      drawTree(0, -len, len * 0.75, angle2, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle3, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle4, branchWidth * 0.6);
      break;
    case 4:
      drawTree(0, -len, len * 0.75, angle1, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle2, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle3, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle4, branchWidth * 0.6);
      break;
    case 5:
      drawTree(0, -len, len * 0.75, angle1, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle2, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle3, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle4, branchWidth * 0.6);
      drawTree(0, -len, len * 0.75, angle5, branchWidth * 0.6);
      break;
    default:
      drawTree(0, -len, len * 0.75, angle3, branchWidth * 0.6);
  }
  ctx.restore();
  //   }, 0);
}

function generateTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const startX = canvas.width / 2;
  const startY = canvas.height * 0.85;

  drawTree(startX, startY, len, angle, branchWidth, color1, color2);
}

function generateRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const startX = canvas.width / 2;
  const startY = canvas.height * 0.85;

  drawTree(startX, startY, len, angle, branchWidth, color1, color2);
}

function randomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function setRandomColors() {
  const newColor1 = randomHexColor();
  const newColor2 = randomHexColor();
  const newColor3 = randomHexColor();
  color1 = newColor1;
  color1Input.value = newColor1;
  color2 = newColor2;
  color2Input.value = newColor2;
  color3 = newColor3;
  color3Input.value = newColor3;
}

/** Draw tree */
generateTree();

/** LISTENERS */
generateButton.addEventListener("click", generateTree);
toggleGlowInput.addEventListener("click", () => {
  hasGlow = !hasGlow;
  generateTree();
});
randomColorButton.addEventListener("click", () => {
  setRandomColors();
  generateTree();
});

color1Input.addEventListener("change", (e) => {
  color1 = e.target.value;
  generateTree();
});
color2Input.addEventListener("change", (e) => {
  color2 = e.target.value;
  generateTree();
});
color3Input.addEventListener("change", (e) => {
  color3 = e.target.value;
  generateTree();
});
leafSizeInput.addEventListener("change", (e) => {
  leafSize = +e.target.value;
  generateTree();
});
branchWidthInput.addEventListener("change", (e) => {
  branchWidth = +e.target.value;
  generateTree();
});
curveInput.addEventListener("change", (e) => {
  curve = +e.target.value;
  generateTree();
});
heightInput.addEventListener("change", (e) => {
  len = +e.target.value;
  generateTree();
});
densityInput.addEventListener("change", (e) => {
  density = +e.target.value;
  generateTree();
});
splitsInput.addEventListener("change", (e) => {
  splits = +e.target.value;
  generateTree();
});
branchOffsetInput.addEventListener("change", (e) => {
  branchOffset = +e.target.value;
  generateTree();
});
