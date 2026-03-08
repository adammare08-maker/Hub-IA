import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

const LUMINA_KEY = process.env.LUMINA_SCRIBE_KEY;
const PORT = process.env.PORT || 3000;

console.log("Lumina KEY :", LUMINA_KEY ? "OK" : "MANQUANTE");

app.get("/", (req, res) => {
  res.send("Backend IAHub OK");
});

app.post("/api/generate", async (req, res) => {
  try {
    if (!LUMINA_KEY)
      return res.status(500).json({ error: "Clé API manquante" });

    const { prompt } = req.body;
    if (!prompt)
      return res.status(400).json({ error: "Prompt manquant" });

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${LUMINA_KEY}`,
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
      text:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Pas de réponse IA"
    });

  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Backend lancé sur https://adammare08-maker.github.io/Hub-IA/:${PORT}`)
);
