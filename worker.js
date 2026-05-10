export default {
  async fetch(request, env) {
    // Récupérer la clé API depuis les variables d'environnement
    const Cloudflare_API_KEY = env.GENERATION_TEXTE;

    // Gérer les requêtes OPTIONS (CORS preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Accepter uniquement les requêtes POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Récupérer les données de la requête
      const { type, prompt } = await request.json();

      let apiUrl, apiBody;

      // Configuration selon le type de génération
      if (type === 'text') {
        apiUrl = 'https://api.together.xyz/v1/chat/completions';
        apiBody = {
          model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 512,
          temperature: 0.7,
        };
      } else if (type === 'image') {
        apiUrl = 'https://api.together.xyz/v1/images/generations';
        apiBody = {
          model: 'black-forest-labs/FLUX.1-schnell',
          prompt: prompt,
          width: 1024,
          height: 768,
          steps: 4,
          n: 1,
        };
      } else {
        return new Response('Invalid type', { status: 400 });
      }

      // Appel à l'API Together
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiBody),
      });

      const data = await response.json();

      // Retourner la réponse avec les en-têtes CORS
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
