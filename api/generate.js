// Fonction Serverless Vercel — /api/generate
// Utilise Groq (gratuit, ultra rapide, disponible en Europe).
// Reçoit { prompt, systemPrompt } et renvoie { text }

export default async function handler(req, res) {
  // Autorisations CORS : permet au site d'appeler ce backend depuis n'importe quelle adresse
  // (Vercel, GitHub Pages, etc.)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Réponse à la requête de pré-vérification du navigateur (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Accepter uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilise POST.' });
  }

  // Récupérer la clé API depuis les variables d'environnement Vercel
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Clé API manquante : ajoute la variable GROQ_API_KEY dans les réglages Vercel.",
    });
  }

  try {
    const { prompt, systemPrompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: 'Le champ "prompt" est obligatoire.' });
    }

    // Construire les messages (system optionnel + user)
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    // Appel à l'API Groq (compatible OpenAI)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // Si l'API renvoie une erreur, la transmettre proprement
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Erreur de l'API Groq.",
      });
    }

    // Renvoyer le texte généré dans le format attendu par le frontend
    return res.status(200).json({
      text: data.choices[0].message.content,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
