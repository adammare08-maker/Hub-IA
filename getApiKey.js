const ai = new GoogleGenAI({ apiKey: "API_KEY_HERE" });
// getApiKey.js
// Ce fichier va extraire la clé API de ton index.html

// Chemin vers ton fichier HTML
const fs = require('fs');
const path = './index.html';

// Lire le fichier HTML
const htmlContent = fs.readFileSync(path, 'utf-8');

// Regex pour trouver la clé API dans le code JS
const apiKeyMatch = htmlContent.match(/apiKey:\s*["']([^"']+)["']/);

if (apiKeyMatch) {
    console.log("Clé API trouvée :", apiKeyMatch[1]);
} else {
    console.log("Aucune clé API trouvée dans le fichier.");
}
