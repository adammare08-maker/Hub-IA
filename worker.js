export default {
  async fetch(request) {
    if (request.method === "POST") {
      const data = await request.json();
      const message = data.message;

      // Exemple d'appels aux 3 IA (à remplacer par tes vrais endpoints)
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

      // Renvoie tout au site
      return new Response(JSON.stringify({
        ia1,
        ia2,
        ia3
      }), { headers: { "Content-Type": "application/json" } });
    }

    return new Response("API Hub IA active");
  }
}
