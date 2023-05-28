const https = require("https");
const fs = require("fs");
const path = require("path");
const nameProject = "My-first-app";

/**
 * Para forzar abril el proyecto en Visual Studio Code
 */
const { exec } = require("child_process");
const { setTimeout } = require("timers/promises");

const projectRoot = "My-first-app";

const foldersToCreate = [
  "controllers",
  "lib",
  "models",
  "routes",
  "setttings",
  "public/css",
  "public/js",
  "public/imgs",
  "src/views",
  "src/views/includes",
  "src/views/pages",
];

console.log("Creando el scaffolding del proyecto ...");

//Código para crear las carpetas
function createFolderStructure(rootPath, folders) {
  folders.forEach((folder) => {
    const folderPath = path.join(rootPath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
    //console.log(`Created folder: ${folderPath}`);
  });
}

// Crear la carpeta raíz del proyecto
fs.mkdirSync(projectRoot, { recursive: true });
//console.log(`Created folder: ${projectRoot}`);

/**
 * Llamando a todas mis funciones
 */
// Cree la estructura de carpetas dentro de la raíz del proyecto.
createFolderStructure(projectRoot, foldersToCreate);
createServerFile(); //server.js
createRouterFile(); //Creando mi router
createpackageFile(); //package.json
createInicioFile(); //src/views/inicio.ejs
createAboutFile(); //src/views/pages/about.ejs
createReadmeFile(); //README.md
creategitIgnoreFile(); //.gitignore
openProjectVisualStudioCode(); //Abril proyecto en Visual Studio Code
createMenuFile(); //Creando archivo public/css/menu.css
createJsMenuFile(); //Creando el archivo menu.js
createHeadFile(); //Crear archivo head.ejs src/views/includes/head.ejs
createHeaderFile(); //Creando el archivo header.ejs src/views/includes/header.ejs
createScriptsFile(); // Creando el archivo para scripts src/views/includes/scripts.ejs

/**
 * Función para crear un archivo con el contenido proporcionado
 */
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  //console.log(`Created file: ${filePath}`);
}

/**
 * Creando mi Router web
 */
function createRouterFile() {
  const RouterFilePath = path.join(projectRoot, "routes/MiRouter.js");
  const contextRouter = `
  //Requerimos express
  const express = require("express");
  //instanciamos router
  const miRouter = express.Router();

  miRouter.get("/", (req, res) => {
    res.render("inicio", {
      rutaActual: "/",
    });
  });

  miRouter.get("/about-me", (req, res) => {
    res.render("pages/about", {
      rutaActual: "/about-me",
    });
  });

  miRouter.use(function (req, res, next) {
    res.status(404).send("La ruta solicitada no existe");
  });

  module.exports = miRouter;
`;
  createFile(RouterFilePath, contextRouter);
}

/**
 * Creando archivo server.js para crear nuestro servidor
 */
function createServerFile() {
  const inicioFilePath = path.join(projectRoot, "server.js");
  const contextServer = `
  //Importando el módulo 'express'
  const express = require('express');

  //Creando una nueva aplicación Express.
  const app = express();
  const path = require("path");

  const PORT = process.env.PORT || 5300;

  /**
   * app.use Se utiliza para montar middlewares en la aplicación Express.
   */
  app.use("/public", express.static(path.join(__dirname, "public")));

  /**
   * Establecer EJS como el Motor de plantillas ejs
   */
  app.set("view engine", "ejs"); 
  app.set("views", path.join(__dirname, "src/views"));


  /**
    * Requiero mi enrutador de rutas
   */
  const router = require("./routes/MiRouter.js");
  // Usa el enrutador como middleware
  app.use("/", router);


  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(\`Servidor escuchando en http://localhost:\${PORT}\`);
  });`;
  createFile(inicioFilePath, contextServer);
}

/**
 * Creando el archivo package.json y su su contenido
 */
function createpackageFile() {
  const packegeFilePath = path.join(projectRoot, "package.json");
  const contentPackage = `
  {
    "name": "my-app",
    "version": "1.0.0",
    "description": "My first project in node and express",
    "main": "server.js",
    "scripts": {
      "dev": "nodemon server.js"
    },
    "keywords": [],
    "author": "Urian Viera",
    "license": "ISC",
    "devDependencies": {
      "nodemon": "^2.0.22"
    },
    "dependencies": {
      "ejs": "^3.1.9",
      "express": "^4.18.2"
    }
  }`;
  createFile(packegeFilePath, contentPackage);
}

/**
 * Creando el archivo menu.css y asignandole el contenido
 */
function createMenuFile() {
  const menuFilePath = path.join(projectRoot, "public/css/menu.css");
  const menuContent = `
  body {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    font-family: "Ubuntu", sans-serif;
  }
  .contentBody{
   margin: 0 auto;
   width: 95%;
   margin-top: 60px;
  }
  h1{
    text-align: center;
  }
  p{
    text-align: center;
  }
  .header {
    background-color: #fff;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    z-index: 3;
    top: 0;
  }
  .header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: #fff;
  }
  .header li a {
    display: block;
    padding: 20px 20px;
    text-decoration: none;
  }
  .header li a:hover,
  .header .menu-btn:hover {
    background-color: #f4f4f4;
  }
  .header .logo {
    display: block;
    float: left;
    font-size: 2em;
    padding: 5px 30px;
    text-decoration: none;
  }
  .logo img {
    width: 115px;
  }
  .header .menu {
    clear: both;
    max-height: 0;
    transition: max-height 0.2s ease-out;
  }
  .header .menu-icon {
    cursor: pointer;
    display: flex;
    float: right;
    padding: 28px 20px;
    position: relative;
    user-select: none;
  }
  .header .menu-icon .navicon {
    background: #333;
    display: block;
    height: 2px;
    position: relative;
    transition: background 0.2s ease-out;
    width: 18px;
  }
  .header .menu-icon .navicon:before,
  .header .menu-icon .navicon:after {
    background: #333;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }
  .header .menu-icon .navicon:before {
    top: 5px;
  }
  .header .menu-icon .navicon:after {
    top: -5px;
  }
  .header .menu-btn {
    display: none;
  }
  .header .menu-btn:checked ~ .menu {
    max-height: 240px;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }
  @media (min-width: 48em) {
    .header li {
      float: left;
    }
    .header li a {
      padding: 20px 30px;
    }
    .header .menu {
      clear: none;
      float: right;
      max-height: none;
    }
    .header .menu-icon {
      display: none;
    }
  }
  .active {
    border-bottom: 3px solid #f0d60d !important;
  }`;
  createFile(menuFilePath, menuContent);
}

/**
 * Creando archivo menu.js public/js/menu.js
 */
function createJsMenuFile() {
  const menuJsFilePath = path.join(projectRoot, "public/js/menu.js");
  const enuJsContent = `
  document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll("nav ul li a:not(:only-child)");
    var navDropdowns = document.querySelectorAll(".nav-dropdown");
    var navToggle = document.getElementById("nav-toggle");

    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function (e) {
        var siblingDropdown = this.nextElementSibling;
        siblingDropdown.style.display =
          siblingDropdown.style.display === "block" ? "none" : "block";

        for (var j = 0; j < navDropdowns.length; j++) {
          if (navDropdowns[j] !== siblingDropdown) {
            navDropdowns[j].style.display = "none";
          }
        }
        e.stopPropagation();
      });
    }

    document.addEventListener("click", function () {
      for (var i = 0; i < navDropdowns.length; i++) {
        navDropdowns[i].style.display = "none";
      }
    });`;
  createFile(menuJsFilePath, enuJsContent);
}

/**
 * Creando el archivo inicio.ejs en la carpeta src/views/inicio.ejs
 * y agrengando un contenido básico
 */
function createInicioFile() {
  const inicioFilePath = path.join(projectRoot, "src/views/inicio.ejs");
  const inicioContent = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <%- include('includes/head') %>
    </head>
    <body>
      <%- include('includes/header') %>

        <div class="contentBody" style="width: 95% !important; margin-top: 80px !important">
            <h1>!Bienvenido 😀!</h1>
            <p>Ya puedes empezar a trabajar...</p>
        </div>

      <%- include('includes/scripts') %>
    </body>
  </html>
  `;
  createFile(inicioFilePath, inicioContent);
}

/**
 * Creando el archivo about.ejs y agrenado un contenido
 */
function createAboutFile() {
  const aboutFilePath = path.join(projectRoot, "src/views/pages/about.ejs");
  const aboutContent = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <%- include('../includes/head') %>
    </head>
    <body>
      <%- include('../includes/header') %>

        <div class="contentBody" style="width: 95% !important; margin-top: 80px !important">
          <h2 class="text-center">Estoy en la página de About</h2>
        </div>

      <%- include('../includes/scripts') %>
    </body>
  </html>
`;
  createFile(aboutFilePath, aboutContent);
}

/**
 * Creando archivo head.ejs src/view/includes/head.ejs
 */
function createHeadFile() {
  const headFilePath = path.join(projectRoot, "src/views/includes/head.ejs");
  const headContent = `
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title></title>
<link rel="shortcut icon" href="public/imgs/favicon.ico" type="image/x-icon" />

<!--fuente-->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
  rel="stylesheet" />

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" />
<link rel="stylesheet" href="public/css/menu.css" />
`;
  createFile(headFilePath, headContent);
}

/**
 * Creando archivo header.ejs y agrenado su contenido
 */
function createHeaderFile() {
  const headerFilePath = path.join(
    projectRoot,
    "src/views/includes/header.ejs"
  );
  const headerContent = `
<header class="header">
  <a href="./" class="logo">
    <img src="public/imgs/logo-web-developer.png" alt="Logo" />
  </a>
  <input class="menu-btn" type="checkbox" id="menu-btn" />
  <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
  <ul class="menu">
    <li>
      <a class="menu-item <%= rutaActual === '/' ? 'active' : '' %>" href="/">Inicio</a>
    </li>
    <li>
      <a class="menu-item <%= rutaActual === '/about-me' ? 'active' : '' %>" href="/about-me">About</a>
    </li>
    <li>
      <a class="menu-item" href="https://urianviera.com/" target="_blank">
        <i class="bi bi-person-circle"></i> UrianV </a>
    </li>
  </ul>
</header>
`;
  createFile(headerFilePath, headerContent);
}

/**
 * Crear archivo scripts src/views/includes/scripts.ejs
 */
function createScriptsFile() {
  const scriptsFilePath = path.join(
    projectRoot,
    "src/views/includes/scripts.ejs"
  );
  const scriptsContent = `
  <script src="../../../public/js/menu.js"></script>
`;
  createFile(scriptsFilePath, scriptsContent);
}

/**
 * Creando archivo README.MD
 */
function createReadmeFile() {
  const readmeFilePath = path.join(projectRoot, "README.md");
  const contentReadme = `
- Estructura del Proyecto

- /My-first-app
- /node_modules
  - /controllers
  - /lib
  - /models
  - /routes
  - /settings
  - /public
      - /css
      - /js
      - /img
  - /src
    - /views
    - /pages
    - /includes
  
- package-lock.json
- package.json
- .gitignore

- Paso para correr el proyecto en NodeJS
- cd My-first-app
- npm install
- npm run dev


- node --watch server.js
- nodemon server.js
- npm start

- Para correr proyecto existente;
  npm i

- Instalar nodemon como dependencia de desarrollo
    npm i nodemon -D
    npm i -D nodemon
    npm install nodemon --dev
    npm install nodemon --save-dev
    
- Instalar nodemon de forma global:
    npm install -g nodemon
`;
  createFile(readmeFilePath, contentReadme);
}

/**
 * Creando el archivo .gitignore
 */
function creategitIgnoreFile() {
  const gitIngnoreFilePath = path.join(projectRoot, ".gitignore");
  const contentGitIgnore = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*`;

  createFile(gitIngnoreFilePath, contentGitIgnore);
}

/**
 * Función para descargar logo
 */
const imageUrl =
  "https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/logo-web-developer.png";

const imagePath = path.join(projectRoot, "public/imgs/logo-web-developer.png");

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

async function main_logo() {
  try {
    await fs.promises.mkdir(path.dirname(imagePath), { recursive: true });
    await downloadImage(imageUrl, imagePath);
    //console.log("La imagen se ha descargado correctamente.");
  } catch (error) {
    // console.error("Error al descargar la imagen:", error);
  }
}
main_logo();

/**
 * Importante
 */
console.log("¡Estructura del proyecto creada con éxito!");
console.log("\n");
console.log("\x1b[32m%s\x1b[0m", "¡IMPORTANTE: Sigue estos pasos! \n");
console.log("cd My-first-app");
console.log("npm install");
console.log("npm run dev");

/**
 * Luego de crear todo el scaffolding (Estructura) de la aplicación,
 * forzar que la misma se habra desde Visual Studio Code
 */
function openProjectVisualStudioCode() {
  const projectPath = path.join(__dirname, nameProject);

  // Abrir el proyecto en Visual Studio Code
  exec(`code ${projectPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al abrir Visual Studio Code: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error en la salida de Visual Studio Code: ${stderr}`);
      return;
    }
    //console.log("Open project in Visual Studio Code.");
  });
}

/**
 * Eliminar el archivo create-project-structure.js luego de haber creado toda
 * la estructura del proyecto
 */
// Obtener la ruta completa del archivo create-project-structure.js

/*
const scriptPath = path.join(__dirname, "create-project-structure.js");
// Eliminar el archivo create-project-structure.js
fs.unlinkSync(scriptPath);
console.log("Archivo create-project-structure.js eliminado.");
*/
