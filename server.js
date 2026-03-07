// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // pour utiliser les clés API dans .env

const app = express();
app.use(express.json());

// Endpoint principal pour recevoir les messages et appeler les IA
app.post("/api", async (req, res) => {
  try {
    const message = req.body.message;
    if (!message) return res.status(400).json({ error: "Message vide" });

    // Appel IA 1
    const ia1 = await fetch("https://api.lumina.io", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CLE_LUMINA}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    // Appel IA 2
    const ia2 = await fetch("https://api.pixel.io", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CLE_PIXEL}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    // Appel IA 3
    const ia3 = await fetch("https://api.visionary.io", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CLE_VISIONARY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    res.json({ ia1, ia2, ia3 });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
