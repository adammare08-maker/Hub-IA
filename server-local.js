import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Servir les fichiers spécifiques de manière sécurisée
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname, 'style.css')));
app.get('/googled4bcc4ae1e7f259d.html', (req, res) => res.sendFile(path.join(__dirname, 'googled4bcc4ae1e7f259d.html')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.post("/api/generate", async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Clé API manquante dans le fichier .env" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: req.body.prompt }] }]
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erreur backend:", error);
    res.status(500).json({ error: "Erreur lors de la communication avec l'API Gemini" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));
