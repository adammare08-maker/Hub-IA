// getApiKey.js - Version Améliorée
const fs = require('fs');
const path = require('path');

// Configuration du chemin (plus robuste)
const filePath = path.join(__dirname, 'index.html');

try {
    // 1. Vérifier si le fichier existe avant de lire
    if (!fs.existsSync(filePath)) {
        console.error("❌ Erreur : Le fichier 'index.html' est introuvable à l'emplacement :", filePath);
        process.exit(1);
    }

    // 2. Lire le contenu
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    // 3. Regex améliorée (cherche 'apiKey' avec ou sans espaces, guillemets simples ou doubles)
    const apiKeyMatch = htmlContent.match(/apiKey\s*:\s*["'](AIza[0-9A-Za-z-_]{35})["']/);

    // 4. Analyse du résultat
    if (apiKeyMatch && apiKeyMatch[1]) {
        const key = apiKeyMatch[1];
        console.log("✅ Clé API détectée !");
        console.log("Clé :", key.substring(0, 8) + "..." + key.substring(key.length - 4)); 
        // Affiche seulement le début et la fin pour plus de sécurité dans la console
    } else {
        console.log("ℹ️ Aucune clé API valide (format Google AI) n'a été trouvée.");
    }

} catch (error) {
    console.error("💥 Une erreur critique est survenue :", error.message);
}
