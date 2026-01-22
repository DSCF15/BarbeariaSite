const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'assets', 'stock');
const outDir = path.join(__dirname, '..', 'src', 'assets', 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    try {
      const p = path.join(srcDir, file);
      const baseName = path.parse(file).name;
      const outJpg = path.join(outDir, baseName + '.jpg');
      const outWebp = path.join(outDir, baseName + '.webp');
      const img = sharp(p);
      const meta = await img.metadata();
      if (meta.width && meta.width > 1200) img.resize(1200);
      await img.jpeg({ quality: 82 }).toFile(outJpg);
      await img.webp({ quality: 82 }).toFile(outWebp);
      console.log('Optimized:', file);
    } catch (err) {
      console.error('Failed:', file, err.message);
    }
  }
  console.log('Done optimizing', files.length, 'files.');
})();
