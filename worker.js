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

    export default {
  async fetch(request) {
    try {
      // Vérifie si la requête est un POST
      if (request.method === "POST") {
        const data = await request.json();
        const message = data.message;

        // Appel à l'IA 1
        const ia1 = await fetch("https://api.lumina.io", {
          method: "POST",
          headers: {
            "Authorization": "Bearer CLE_LUMINA",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: message })
        }).then(r => r.json());

        // Appel à l'IA 2
        const ia2 = await fetch("https://api.pixel.io", {
          method: "POST",
          headers: {
            "Authorization": "Bearer CLE_PIXEL",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: message })
        }).then(r => r.json());

        // Appel à l'IA 3
        const ia3 = await fetch("https://api.visionary.io", {
          method: "POST",
          headers: {
            "Authorization": "Bearer CLE_VISIONARY",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: message })
        }).then(r => r.json());

        // Renvoie la réponse consolidée au site
        return new Response(JSON.stringify({
          ia1,
          ia2,
          ia3
        }), { headers: { "Content-Type": "application/json" } });
      }

      // Si ce n'est pas un POST, retourne un message par défaut
      return new Response("API Hub IA active", { status: 200 });

    } catch (err) {
      // Gestion des erreurs : renvoie un message si quelque chose plante
      return new Response(JSON.stringify({
        error: "Une erreur est survenue dans le Worker",
        details: err.message
      }), { headers: { "Content-Type": "application/json" }, status: 500 });
    }
  }
}
  }
}
