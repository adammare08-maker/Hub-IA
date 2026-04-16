const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

export default {
  async fetch(request, env) {

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api/generate" && request.method === "POST") {
      try {

        // 🔥 DEBUG CLAIR
        if (!Variables et secrets.Génération_Texte) {
          return json({ error: "❌ Clé API absente dans Cloudflare." }, 500);
        }

        const body = await request.json();
        const { prompt } = body;

        if (!prompt || typeof prompt !== "string") {
          return json({ error: "❌ Prompt invalide." }, 400);
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.LUMINA_SCRIBE_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: prompt }]
                }
              ]
            })
          }
        );

        const data = await response.json();

        // 🔥 DEBUG cloudflare
        if (!response.ok) {
          return json({
            error: "❌ Erreur API cloudflare",
            details: data
          }, 500);
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return json({ text: text || "Pas de réponse." });

      } catch (err) {
        return json({ error: "❌ Erreur serveur", details: err.message }, 500);
      }
    }

    return new Response("IAHub Worker OK", { headers: corsHeaders });
  }
};
