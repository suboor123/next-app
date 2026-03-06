const fs = require("fs");
const path = require("path");
const { minify } = require("html-minifier-terser");

const directory = "./"; // current directory

const allowMinification = {
    "index.html": false,
    "me.html": true,
    "react-nextjs-developer.html": true,
    "performance.html": false,
    "react-nextjs-developer": true
}

async function minifyHtmlFiles() {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    if(!allowMinification[file]) {}
    else {
        if (path.extname(file) === ".html") {

            const filePath = path.join(directory, file);
      
            const html = fs.readFileSync(filePath, "utf8");
      
            const minified = await minify(html, {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeEmptyAttributes: true,
              minifyCSS: true,
              minifyJS: true
            });
      
            fs.writeFileSync(filePath, minified);
      
            console.log(`Minified: ${file}`);
          }
    }
  

  }

  console.log("All HTML files minified.");
}

minifyHtmlFiles();