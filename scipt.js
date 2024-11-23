const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');

// Sample emoji (face)
ctx.beginPath();
ctx.arc(150, 150, 100, 0, Math.PI * 2); // Draw circle
ctx.fillStyle = '#ffcc00';
ctx.fill();
ctx.beginPath();
ctx.arc(110, 120, 15, 0, Math.PI * 2); // Left eye
ctx.fillStyle = '#000';
ctx.fill();
ctx.beginPath();
ctx.arc(190, 120, 15, 0, Math.PI * 2); // Right eye
ctx.fillStyle = '#000';
ctx.fill();
ctx.beginPath();
ctx.arc(150, 180, 40, 0, Math.PI); // Smile
ctx.lineWidth = 5;
ctx.stroke();

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
    range.selectNode(img);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert('Emoji copied to clipboard!');
  };
});
