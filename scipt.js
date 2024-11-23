const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const generateCodeBtn = document.getElementById('generateCodeBtn');
const emojiGallery = document.getElementById('emojiGallery');
const shareCodeArea = document.getElementById('shareCode');

// Emoji Data (Predefined list, could be fetched from an API or extended)
const emojiList = [
  { symbol: "😀", name: "Grinning Face" },
  { symbol: "😎", name: "Smiling Face with Sunglasses" },
  { symbol: "😂", name: "Face with Tears of Joy" },
  { symbol: "😍", name: "Heart Eyes" },
  // Add more emojis as needed
];

// Initial Emoji Data
let faceColor = '#ffcc00';
let eyeShape = 'circle'; // Options: 'circle', 'rectangle'
let mouthType = 'smile'; // Options: 'smile', 'frown', 'neutral'
let accessory = ''; // Options: '', 'glasses'

// Load Emojis into the Gallery
function loadEmojis() {
  emojiGallery.innerHTML = ''; // Clear gallery

  emojiList.forEach(emoji => {
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'emoji';
    emojiDiv.textContent = emoji.symbol;
    emojiDiv.onclick = () => loadEmoji(emoji);
    emojiGallery.appendChild(emojiDiv);
  });
}

// Search Emojis
function searchEmojis() {
  const query = document.getElementById('emojiSearch').value.toLowerCase();
  const filteredEmojis = emojiList.filter(emoji => emoji.name.toLowerCase().includes(query));
  
  emojiGallery.innerHTML = '';
  filteredEmojis.forEach(emoji => {
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'emoji';
    emojiDiv.textContent = emoji.symbol;
    emojiDiv.onclick = () => loadEmoji(emoji);
    emojiGallery.appendChild(emojiDiv);
  });
}

// Load Selected Emoji into the Editor
function loadEmoji(emoji) {
  faceColor = '#ffcc00'; // Default face color for all
  eyeShape = 'circle'; // Default eye shape
  mouthType = 'smile'; // Default mouth
  accessory = ''; // Default accessories
  
  // You can customize further based on emoji type
  drawEmoji();
}

// Draw the Emoji
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

// Generate Shareable Code (HTML or JavaScript)
function generateShareableCode() {
  const code = `
  <div style="font-size: 50px;">
    ${emojiList[0].symbol} <!-- Customize this with actual emoji -->
  </div>
  <script>
    // Add your customization logic here
  </script>`;
  shareCodeArea.value = code;
}

// Initialize the Page
loadEmojis();
