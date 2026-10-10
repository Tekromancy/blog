import sharp from 'sharp';
import { join } from 'path';

const publicDir = join(process.cwd(), 'public');
const sourceFile = join(publicDir, 'ads', 'logo-icon-512x512.png');

async function generateIcons() {
  console.log('Generating PWA Icons...');
  
  await sharp(sourceFile)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  await sharp(sourceFile)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'android-chrome-192x192.png'));
  console.log('Generated android-chrome-192x192.png');

  await sharp(sourceFile)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'android-chrome-512x512.png'));
  console.log('Generated android-chrome-512x512.png');
}

generateIcons().catch(console.error);
