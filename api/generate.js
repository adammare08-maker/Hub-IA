// Fonction Serverless Vercel — /api/generate
// Utilise Groq (gratuit, ultra rapide, disponible en Europe).
// Reçoit { prompt, systemPrompt, image? } et renvoie { text }
// Si "image" (data URL base64) est fourni, utilise un modèle vision pour l'analyser.

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
    const { prompt, systemPrompt, image } = req.body;

    if ((!prompt || !prompt.trim()) && !image) {
      return res.status(400).json({ error: 'Le champ "prompt" est obligatoire.' });
    }

    // Construire les messages (system optionnel + user)
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    // Si une image est fournie, on utilise un modèle "vision" qui sait analyser les images
    let model = 'llama-3.3-70b-versatile';
    if (image) {
      model = 'meta-llama/llama-4-scout-17b-16e-instruct';
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: prompt || 'Décris cette image en détail, en français.' },
          { type: 'image_url', image_url: { url: image } },
        ],
      });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    // Appel à l'API Groq (compatible OpenAI)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
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
