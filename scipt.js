const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');

// Initial Emoji Data
let faceColor = '#ffcc00';
let eyeShape = 'circle'; // Options: 'circle', 'rectangle'
let mouthType = 'smile'; // Options: 'smile', 'frown', 'neutral'
let accessory = ''; // Options: '', 'glasses'

// Function to Draw the Emoji
function drawEmoji() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the face
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2); // Draw face circle
  ctx.fillStyle = faceColor;
  ctx.fill();

  // Draw Eyes
  drawEyes();

  // Draw Mouth
  drawMouth();

  // Draw Accessories
  if (accessory === 'glasses') {
    drawGlasses();
  }
}

// Draw Eyes
function drawEyes() {
  ctx.fillStyle = '#000'; // Eye color

  if (eyeShape === 'circle') {
    ctx.beginPath();
    ctx.arc(110, 120, 15, 0, Math.PI * 2); // Left eye
    ctx.fill();
    ctx.beginPath();
    ctx.arc(190, 120, 15, 0, Math.PI * 2); // Right eye
    ctx.fill();
  } else if (eyeShape === 'rectangle') {
    ctx.fillRect(95, 110, 30, 20); // Left eye
    ctx.fillRect(175, 110, 30, 20); // Right eye
  }
}

// Draw Mouth
function drawMouth() {
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (mouthType === 'smile') {
    ctx.arc(150, 180, 40, 0, Math.PI); // Smile
  } else if (mouthType === 'frown') {
    ctx.arc(150, 180, 40, Math.PI, 2 * Math.PI); // Frown
  } else {
    ctx.moveTo(110, 200);
    ctx.lineTo(190, 200); // Neutral
  }
  ctx.stroke();
}

// Draw Glasses
function drawGlasses() {
  ctx.strokeStyle = '#000'; // Glasses frame color
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.rect(85, 95, 40, 20); // Left lens
  ctx.rect(175, 95, 40, 20); // Right lens
  ctx.moveTo(125, 105);
  ctx.lineTo(175, 105); // Bridge of glasses
  ctx.stroke();
}

// Customization Functions
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

function addAccessory() {
  accessory = accessory === '' ? 'glasses' : ''; // Toggle glasses
  drawEmoji();
}

// Initial Draw
drawEmoji();

// Download Emoji as PNG
downloadBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'emoji.png';
  link.click();
});

// Copy Emoji to Clipboard
copyBtn.addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const img = new Image();
  img.src = dataUrl;
  img.onload = function () {
    const range = document.createRange();
    range.selectNode(img);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert('Emoji copied to clipboard!');
  };
});
