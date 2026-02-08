import "dotenv/config";        // charge les variables du .env
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = "MA_CLé_API";
const PORT = process.env.PORT || 3000;

// Route pour générer du texte avec Google Gemini
app.post("/api/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Prompt manquant" });

    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await r.json();
    res.json({
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse"
    });

  } catch (err) {
    res.status(500).json({ error: "Erreur serveur : " + err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Backend sécurisé lancé sur le port ${PORT}`));
