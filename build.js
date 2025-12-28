const fs = require("fs");
const path = require("path");

// Função para minificar HTML
function minifyHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // Remove comentários
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um
    .replace(/>\s+</g, "><") // Remove espaços entre tags
    .replace(/\s+>/g, ">") // Remove espaços antes de >
    .replace(/<\s+/g, "<") // Remove espaços depois de <
    .trim();
}

// Função para minificar CSS
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comentários
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um
    .replace(/;\s*}/g, "}") // Remove ; antes de }
    .replace(/\s*{\s*/g, "{") // Remove espaços ao redor de {
    .replace(/;\s*/g, ";") // Remove espaços depois de ;
    .replace(/:\s*/g, ":") // Remove espaços depois de :
    .replace(/,\s*/g, ",") // Remove espaços depois de ,
    .trim();
}

// Função para minificar JavaScript (básica)
function minifyJS(js) {
  return js
    .replace(/\/\/.*$/gm, "") // Remove comentários de linha
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comentários de bloco
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um
    .replace(/;\s*}/g, ";}") // Mantém ; antes de }
    .replace(/\s*{\s*/g, "{") // Remove espaços ao redor de {
    .replace(/;\s+/g, ";") // Remove espaços depois de ;
    .replace(/,\s+/g, ",") // Remove espaços depois de ,
    .trim();
}

try {
  console.log("🔨 Iniciando build...");

  // Lê os arquivos
  const htmlContent = fs.readFileSync("index.html", "utf8");
  const cssContent = fs.readFileSync("styles.css", "utf8");
  const jsContent = fs.readFileSync("script.js", "utf8");

  console.log("📖 Arquivos lidos com sucesso");

  // Minifica o conteúdo
  const minifiedCSS = minifyCSS(cssContent);
  const minifiedJS = minifyJS(jsContent);

  console.log("⚡ Conteúdo minificado");

  // Substitui as importações no HTML
  let buildHTML = htmlContent
    .replace(
      '<link rel="stylesheet" href="styles.css" />',
      `<style>${minifiedCSS}</style>`
    )
    .replace(
      '<script src="script.js"></script>',
      `<script>${minifiedJS}</script>`
    );

  // Minifica o HTML final
  buildHTML = minifyHTML(buildHTML);

  // Escreve o arquivo build.html
  fs.writeFileSync("build.html", buildHTML);

  // Estatísticas
  const originalSize =
    htmlContent.length + cssContent.length + jsContent.length;
  const buildSize = buildHTML.length;
  const reduction = (((originalSize - buildSize) / originalSize) * 100).toFixed(
    1
  );

  console.log("✅ Build concluído!");
  console.log(`📊 Tamanho original: ${(originalSize / 1024).toFixed(1)}KB`);
  console.log(`📊 Tamanho build: ${(buildSize / 1024).toFixed(1)}KB`);
  console.log(`📊 Redução: ${reduction}%`);
  console.log("📄 Arquivo gerado: build.html");
} catch (error) {
  console.error("❌ Erro durante o build:", error.message);
  process.exit(1);
}
