const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZE = 1024;
const BACKGROUND_COLOR = '#2196F3';

async function generateIcons() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  
  // Create assets directory if it doesn't exist
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
  }

  // Create a simple icon with text
  const svg = `
    <svg width="${ICON_SIZE}" height="${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BACKGROUND_COLOR}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="200" fill="white" text-anchor="middle" dy=".3em">RF</text>
    </svg>
  `;

  // Generate icon.png
  await sharp(Buffer.from(svg))
    .resize(ICON_SIZE, ICON_SIZE)
    .toFile(path.join(assetsDir, 'icon.png'));

  // Generate adaptive-icon.png
  await sharp(Buffer.from(svg))
    .resize(ICON_SIZE, ICON_SIZE)
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));

  // Generate splash.png (white background with blue logo)
  const splashSvg = `
    <svg width="${ICON_SIZE}" height="${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <text x="50%" y="50%" font-family="Arial" font-size="200" fill="${BACKGROUND_COLOR}" text-anchor="middle" dy=".3em">RF</text>
    </svg>
  `;

  await sharp(Buffer.from(splashSvg))
    .resize(ICON_SIZE, ICON_SIZE)
    .toFile(path.join(assetsDir, 'splash.png'));

  // Generate favicon.png (smaller version of icon)
  await sharp(Buffer.from(svg))
    .resize(196, 196)
    .toFile(path.join(assetsDir, 'favicon.png'));

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);