const JimpModule = require('jimp');
// Support both CJS and ESM default exports
const Jimp = (JimpModule && typeof JimpModule.read === 'function') ? JimpModule : (JimpModule && JimpModule.default) ? JimpModule.default : JimpModule;
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
      const img = await (typeof Jimp.read === 'function' ? Jimp.read(p) : Jimp(p));
      const maxWidth = 1200;
      if (img.getWidth() > maxWidth) img.resize(maxWidth, Jimp.AUTO);
      const baseName = path.parse(file).name;
      const outJpg = path.join(outDir, baseName + '.jpg');
      const outWebp = path.join(outDir, baseName + '.webp');
      await img.quality(82).writeAsync(outJpg);
      await img.quality(82).writeAsync(outWebp);
      console.log('Optimized:', file);
    } catch (err) {
      console.error('Failed:', file, err);
    }
  }
  console.log('Done optimizing', files.length, 'files.');
})();
