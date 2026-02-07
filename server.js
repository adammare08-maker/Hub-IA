import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: req.body.prompt }] }]
      })
    }
  );

  const data = await r.json();
  res.json(data);
});

app.listen(3000, () => console.log("✅ Backend sécurisé lancé"));
