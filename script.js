fetch("https://hub-ia.[ton-compte].workers.dev", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Bonjour Worker !" })
})
.then(res => res.json())
.then(data => console.log(data));

// server.js pour Railway
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api", async (req, res) => {
  try {
    const message = req.body.message;

    // Exemple d'appels aux 3 IA (à adapter avec tes clés et endpoints réels)
    const ia1 = await fetch("https://api.lumina.io", {
      method: "POST",
      headers: { "Authorization": "Bearer CLE_LUMINA", "Content-Type": "application/json" },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    const ia2 = await fetch("https://api.pixel.io", {
      method: "POST",
      headers: { "Authorization": "Bearer CLE_PIXEL", "Content-Type": "application/json" },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    const ia3 = await fetch("https://api.visionary.io", {
      method: "POST",
      headers: { "Authorization": "Bearer CLE_VISIONARY", "Content-Type": "application/json" },
      body: JSON.stringify({ input: message })
    }).then(r => r.json());

    res.json({ ia1, ia2, ia3 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
