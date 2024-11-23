const emojiGallery = document.getElementById('emojiGallery');
const shareCodeArea = document.getElementById('shareCode');
const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');
const emojiSearch = document.getElementById('emojiSearch');

// Use the provided API key
const API_URL = 'https://emoji-api.com/emojis?access_key=c1e940e6dbe3fbd13928416585178ed4f99c690c';

let emojis = [];
let currentEmoji = null;
let emojiSize = 150; // Default size for the emoji
let emojiColor = 'black'; // Default color for the emoji

// Fetch all emojis from the API
async function fetchEmojis() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch emojis');
    emojis = await response.json();
    updateEmojiGallery(emojis);
  } catch (error) {
    console.error('Error fetching emojis:', error);
  }
}

// Update emoji gallery with a list of emojis
function updateEmojiGallery(emojisToDisplay) {
  emojiGallery.innerHTML = ''; // Clear existing gallery

  emojisToDisplay.forEach(emoji => {
    const emojiDiv = document.createElement('div');
    emojiDiv.className = 'emoji';
    emojiDiv.textContent = emoji.character;
    emojiDiv.onclick = () => loadEmoji(emoji); // Load emoji when clicked
    emojiGallery.appendChild(emojiDiv);
  });
}

// Load selected emoji into the canvas
function loadEmoji(emoji) {
  currentEmoji = emoji; // Store the current selected emoji
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the emoji on canvas
  ctx.font = `${emojiSize}px Arial`;
  ctx.fillStyle = emojiColor; // Use the selected color
  ctx.fillText(emoji.character, 75, 150); // Adjust the position and size as needed
}

// Search emojis based on input
function searchEmojis() {
  const query = emojiSearch.value.toLowerCase();
  const filteredEmojis = emojis.filter(emoji => emoji.character.toLowerCase().includes(query));
  updateEmojiGallery(filteredEmojis);
}

// Change the emoji size
function changeEmojiSize(size) {
  emojiSize = size;
  if (currentEmoji) {
    loadEmoji(currentEmoji); // Re-load emoji with new size
  }
}

// Change the emoji color
function changeEmojiColor(color) {
  emojiColor = color;
  if (currentEmoji) {
    loadEmoji(currentEmoji); // Re-load emoji with new color
  }
}

// Generate shareable code
function generateShareableCode() {
  if (currentEmoji) {
    const code = `<div style="font-size: ${emojiSize}px; color: ${emojiColor};">${currentEmoji.character}</div>`;
    shareCodeArea.value = code;
  } else {
    shareCodeArea.value = 'Please select an emoji first!';
  }
}

// Call fetchEmojis when the page loads
window.onload = fetchEmojis;
