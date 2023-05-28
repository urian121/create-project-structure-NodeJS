const https = require("https");
const fs = require("fs");
const path = require("path");

const imageUrl =
  "https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/logo-web-developer.png";
const imagePath = path.join(__dirname, "public/imgs/logo-web-developer.png");

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", resolve);
      })
      .on("error", reject);
  });
}

async function main() {
  try {
    await fs.promises.mkdir(path.dirname(imagePath), { recursive: true });
    await downloadImage(imageUrl, imagePath);
    console.log("La imagen se ha descargado correctamente.");
  } catch (error) {
    console.error("Error al descargar la imagen:", error);
  }
}

main();
