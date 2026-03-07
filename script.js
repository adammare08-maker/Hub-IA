fetch("https://hub-ia.[ton-compte].workers.dev", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Bonjour Worker !" })
})
.then(res => res.json())
.then(data => console.log(data));

// Exemple de fonction pour envoyer un message au Worker
async function envoyerMessageAuWorker(message) {
  try {
    // Envoie la requête POST avec la charge utile JSON
    const response = await fetch("https://hub-ia.[ton-compte].workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    // Récupère la réponse en JSON
    const data = await response.json();

    // Affiche les réponses des 3 IA dans la console
    console.log("IA 1 :", data.ia1);
    console.log("IA 2 :", data.ia2);
    console.log("IA 3 :", data.ia3);

    // Retourne les données pour les utiliser ailleurs
    return data;

  } catch (error) {
    console.error("Erreur lors de la requête au Worker :", error);
    return null;
  }
}

// Exemple d'utilisation : envoyer un message depuis un bouton ou un champ de saisie
document.getElementById("envoyerBtn").addEventListener("click", async () => {
  const message = document.getElementById("inputMessage").value;
  const reponses = await envoyerMessageAuWorker(message);

  if (reponses) {
    // Exemple : afficher les réponses dans la page HTML
    document.getElementById("resultatIA1").textContent = reponses.ia1?.response || "Pas de réponse";
    document.getElementById("resultatIA2").textContent = reponses.ia2?.response || "Pas de réponse";
    document.getElementById("resultatIA3").textContent = reponses.ia3?.response || "Pas de réponse";
  }
});
