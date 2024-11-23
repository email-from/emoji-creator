const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');

let faceColor = '#ffcc00';
let eyeShape = 'circle'; // 'circle' or 'rectangle'
let mouthType = 'smile'; // 'smile', 'frown', 'neutral'
let accessoryType = ''; // Optional accessory (e.g., glasses, hats)

// Function to redraw the emoji with current settings
function drawEmoji() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw Face
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2); // Draw circle
  ctx.fillStyle = faceColor;
  ctx.fill();

  // Draw Eyes
  drawEyes();

  // Draw Mouth
  drawMouth();

  // Draw Accessories (if any)
  if (accessoryType) {
    drawAccessory();
  }
}

// Draw Eyes based on selected shape
function drawEyes() {
  ctx.fillStyle = '#000'; // Black color for eyes
  if (eyeShape === 'circle') {
    ctx.beginPath();
    ctx.arc(110, 120, 15, 0, Math.PI * 2); // Left eye
    ctx.fill();
    ctx.beginPath();
    ctx.arc(190, 120, 15, 0, Math.PI * 2); // Right eye
    ctx.fill();
  } else if (eyeShape === 'rectangle') {
    ctx.fillRect(95, 110, 30, 20); // Left eye (rectangle)
    ctx.fillRect(175, 110, 30, 20); // Right eye (rectangle)
  }
}

// Draw Mouth based on selected type
function drawMouth() {
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (mouthType === 'smile') {
    ctx.arc(150, 180, 40, 0, Math.PI); // Smile
  } else if (mouthType === 'frown') {
    ctx.arc(150, 180, 40, Math.PI, 2 * Math.PI); // Frown
  } else {
    ctx.moveTo(110, 200);
    ctx.lineTo(190, 200); // Neutral straight line mouth
  }
  ctx.stroke();
}

// Draw Accessories (example: glasses)
function drawAccessory() {
  if (accessoryType === 'glasses') {
    ctx.beginPath();
    ctx.rect(85, 95, 40, 20); // Left glasses frame
    ctx.rect(175, 95, 40, 20); // Right glasses frame
    ctx.stroke();
  }
}

// Functions for customization
function changeFaceColor() {
  const colors = ['#ffcc00', '#ff6666', '#66ff66', '#6666ff', '#ff66cc'];
  faceColor = colors[Math.floor(Math.random() * colors.length)];
  drawEmoji();
}

function changeEyeShape() {
  eyeShape = eyeShape === 'circle' ? 'rectangle' : 'circle';
  drawEmoji();
}

function changeMouth() {
  const mouths = ['smile', 'frown', 'neutral'];
  mouthType = mouths[(mouths.indexOf(mouthType) + 1) % mouths.length];
  drawEmoji();
}

function changeAccessory() {
  // Cycle through accessories (e.g., glasses)
  const accessories = ['', 'glasses'];
  accessoryType = accessories[(accessories.indexOf(accessoryType) + 1) % accessories.length];
  drawEmoji();
}

// Initial drawing of the emoji
drawEmoji();

// Download emoji as PNG
downloadBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'emoji.png';
  link.click();
});

// Copy emoji to clipboard (as image)
copyBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = dataUrl;
  img.onload = function () {
    const range = document.createRange();
    range.selectNode(img
