export default {
  async fetch(request, env) {
    // En-têtes CORS communs à toutes les réponses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Gérer les requêtes OPTIONS (CORS preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Accepter uniquement les requêtes POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    // Récupérer la clé API depuis les variables d'environnement (secret Cloudflare)
    const apiKey = env.TOGETHER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Clé API manquante : configure le secret TOGETHER_API_KEY sur Cloudflare." }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const { type, prompt } = await request.json();

      if (!prompt) {
        return new Response(
          JSON.stringify({ error: 'Le champ "prompt" est obligatoire.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      let apiUrl, apiBody;

      // Configuration selon le type de génération
      if (type === 'text') {
        apiUrl = 'https://api.together.xyz/v1/chat/completions';
        apiBody = {
          model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 512,
          temperature: 0.7,
        };
      } else if (type === 'image') {
        apiUrl = 'https://api.together.xyz/v1/images/generations';
        apiBody = {
          model: 'black-forest-labs/FLUX.1-schnell',
          prompt: prompt,
          width: 1024,
          height: 1024,
          steps: 4,
          n: 1,
        };
      } else {
        return new Response(
          JSON.stringify({ error: 'Type invalide : utilise "text" ou "image".' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Appel à l'API Together
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiBody),
      });

      const data = await response.json();

      // Si l'API renvoie une erreur, la transmettre proprement
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: data.error?.message || 'Erreur API Together' }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Extraire le résultat selon le type
      const result =
        type === 'text'
          ? data.choices[0].message.content
          : data.data[0].url;

      return new Response(JSON.stringify({ result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
