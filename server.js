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
        if (!env.LUMINA_SCRIBE_KEY) {
          return json({ error: "Clé API manquante." }, 500);
        }

        const body = await request.json();
        const { prompt, systemPrompt } = body;

        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
          return json({ error: "Le prompt est vide ou invalide." }, 400);
        }

        if (prompt.length > 4000) {
          return json({ error: "Le prompt est trop long (max 4000 caractères)." }, 400);
        }

        const contents = [];

        if (systemPrompt && typeof systemPrompt === "string") {
          contents.push({ role: "user", parts: [{ text: systemPrompt }] });
          contents.push({ role: "model", parts: [{ text: "Compris." }] });
        }

        contents.push({ role: "user", parts: [{ text: prompt.trim() }] });

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + env.LUMINA_SCRIBE_KEY,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: { maxOutputTokens: 1024, temperature: 0.7 }
            })
          }
        );

        if (!response.ok) {
          const err = await response.json();
          return json({ error: "Je tente de mettre ma clé API. Merci pour votre compréhension.", details: err?.error?.message }, 502);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return json({ text: text || "Pas de réponse IA." });

      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    return new Response("IAHub Worker OK", { headers: corsHeaders });
  }
};
