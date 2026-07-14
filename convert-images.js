const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/images";

(async () => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const input = path.join(dir, file);
    const output = path.join(
      dir,
      path.basename(file, ext) + ".webp"
    );

    try {
      await sharp(input)
        .webp({ quality: 82 })
        .toFile(output);

      console.log("✓", file, "->", path.basename(output));
    } catch (e) {
      console.log("✗", file, e.message);
    }
  }
})();
