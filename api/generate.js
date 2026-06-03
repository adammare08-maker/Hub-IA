// Fonction Serverless Vercel — /api/generate
// Reçoit { prompt, systemPrompt } et renvoie { text }

export default async function handler(req, res) {
  // Accepter uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilise POST.' });
  }

  // Récupérer la clé API depuis les variables d'environnement Vercel
  const apiKey = process.env.TOGETHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Clé API manquante : ajoute la variable TOGETHER_API_KEY dans les réglages Vercel.",
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

    // Appel à l'API Together
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // Si l'API renvoie une erreur, la transmettre proprement
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Erreur de l\'API Together.',
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
