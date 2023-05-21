const fs = require("fs");
const path = require("path");
/**
 * Para forzar abril el proyecto en Visual Studio Code
 */
const { exec } = require("child_process");

const projectRoot = "My-App";

const foldersToCreate = [
  "controllers",
  "routes",
  "public/css",
  "public/js",
  "public/img",
  "src/components",
  "src/views",
  "src/views/pages",
  "src/services",
];

console.log("Creating project structure...");

//Código para crear las carpetas
function createFolderStructure(rootPath, folders) {
  folders.forEach((folder) => {
    const folderPath = path.join(rootPath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  });
}

// Crear la carpeta raíz del proyecto
fs.mkdirSync(projectRoot, { recursive: true });
console.log(`Created folder: ${projectRoot}`);

// Cree la estructura de carpetas dentro de la raíz del proyecto.
createFolderStructure(projectRoot, foldersToCreate);

/**
 * Creando el archivo inicio.ejs
 */
const inicioFilePath = path.join(projectRoot, "src/views/inicio.ejs");
/**
 * Creando el archivo inicio.ejs en la carpeta src/views/inicio.ejs
 * y agrengando un contenido básico
 */
const inicioContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inicio</title>
  </head>
  <body>
    <h1>Hola, estas en la página de Inicio</h1>
  </body>
</html>
`;

// Crear el archivo inicio.ejs
fs.writeFileSync(inicioFilePath, inicioContent);
console.log(`Created file: ${inicioFilePath}`);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/**
 * Creando el archivo about.ejs y agrenado un contenido
 */
const aboutContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inicio</title>
    <link
      type="text/css"
      rel="shortcut icon"
      href="https://urianviera.com/img/icons/favicon-32x32.png" />
    <style>
      body {
        padding: 0;
        margin: 0;
        margin: 0 auto;
        background: #f0f0f0;
      }
      h1 {
        background: #f0dd14;
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      p {
        font-size: 30px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Hola, estas en la página de about</h1>
    <div class="centered"></div>

    <div class="flex-container">
      <p>Canal WebDeveloper - Urian Viera</p>
    </div>
  </body>
</html>
`;
fs.writeFileSync(
  path.join(projectRoot, "src/views/pages/about.ejs"),
  aboutContent
);
console.log(`Created file: src/views/pages/about.ejs`);

/**
 * Creando servidor con express
 */
const serverCode = `
//Importando el módulo 'express'
const express = require('express');

//Creando una nueva aplicación Express.
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

/**
 * app.use Se utiliza para montar middlewares en la aplicación Express.
 * Los middlewares son funciones que se ejecutan en el flujo de procesamiento de una solicitud antes
 * de que se envíe una respuesta Middleware para servir archivos estáticos desde la carpeta "public"
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Establecer EJS como el Motor de plantillas
 * se utiliza para establecer la configuración de la aplicación Express. Puedes utilizar app.set 
 * para configurar variables de entorno, ajustes específicos de la aplicación o valores personalizados. 
 */
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "src/views"));


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.render("inicio");
});

// Ruta de about
app.get("/about", (req, res) => {
  res.render("pages/about");
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(\`Servidor escuchando en el puerto \${PORT}\`);
});
`;

fs.writeFileSync(path.join(projectRoot, "server.js"), serverCode);
console.log(`Created file: server.js`);

/**
 * Creando archivo README.MD
 */
const readmeContent = `
- Estructura del Proyecto

- /My-App
- /node_modules
  - /controllers
  - /routes
  - /public
      - /css
      - /js
      - /img
  - /src
    - /components
    - /views
    - /services
  
- package-lock.json
- package.json
- .gitignore

- Paso para inicial proyecto en NodeJS
- npm init -y
- npm install express
- npm i ejs


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

fs.writeFileSync(path.join(projectRoot, "README.md"), readmeContent);
console.log(`Created file: README.md`);

/**
 * Creando el archivo .gitignore
 */
const gitignoreContent = `# Logs
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

fs.writeFileSync(path.join(projectRoot, ".gitignore"), gitignoreContent);
console.log(`Created file: .gitignore`);
console.log("\x1b[32m%s\x1b[0m", "Project structure created successfully!");

/**
 * Importante
 */
console.log("\n\n");
console.log("\x1b[32m%s\x1b[0m", "¡IMPORTANTE: Sigue estos pasos! \n");

console.log("Inicia un proyecto en NodeJS...");
console.log("Comando:", "\x1b[32mnpm init -y\x1b[0m");

console.log("Instala el framework de express...");
console.log("Comando:", "\x1b[32mnpm install express\x1b[0m");

console.log("Instala Nodemon como dependencia de desarrollo...");
console.log("Comando:", "\x1b[32mnpm install nodemon -D\x1b[0m");

console.log("Instala Motor de plantilla EJS...");
console.log("Comando:", "\x1b[32mnpm install ejs\x1b[0m");

console.log("Corre proyecto con nodemon...");

console.log(
  "Comando:",
  "\x1b[32mnodemon server.js\x1b[0m o puedes ejecutar \x1b[32mnode --watch server.js\x1b[0m"
);

/**
 * Luego de crear todo el scaffolding (Estructura) de la aplicación,
 * forzar que la misma se habra desde Visual Studio Code
 */
// Obtener la ruta completa de la carpeta My-App
const projectPath = path.join(__dirname, "My-App");

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
  console.log("Open project in Visual Studio Code.");
});

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
