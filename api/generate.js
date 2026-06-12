// Fonction Serverless Vercel — /api/generate
// Utilise Google Gemini (gratuit via Google AI Studio).
// Reçoit { prompt, systemPrompt } et renvoie { text }

export default async function handler(req, res) {
  // Accepter uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilise POST.' });
  }

  // Récupérer la clé API depuis les variables d'environnement Vercel
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Clé API manquante : ajoute la variable GEMINI_API_KEY dans les réglages Vercel.",
    });
  }

  try {
    const { prompt, systemPrompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Le champ "prompt" est obligatoire.' });
    }

    // Construire le corps de la requête au format Gemini
    const body = {
      contents: [
        { role: 'user', parts: [{ text: prompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    // Le "system prompt" (instruction système) est optionnel
    if (systemPrompt) {
      body.system_instruction = { parts: [{ text: systemPrompt }] };
    }

    const model = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // Appel à l'API Gemini
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Si l'API renvoie une erreur, la transmettre proprement
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Erreur de l'API Gemini.",
      });
    }

    // Extraire le texte généré
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: "Réponse vide de l'API Gemini." });
    }

    // Renvoyer dans le format attendu par le frontend
    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
