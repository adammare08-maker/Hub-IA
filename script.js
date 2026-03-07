// script.js
async function envoyerMessage(message) {
  try {
    const response = await fetch("https://[ton-projet-railway].railway.app/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    console.log("IA 1:", data.ia1);
    console.log("IA 2:", data.ia2);
    console.log("IA 3:", data.ia3);

    // Affichage simple dans la page
    document.getElementById("resultatIA1").textContent = data.ia1?.response || "Pas de réponse";
    document.getElementById("resultatIA2").textContent = data.ia2?.response || "Pas de réponse";
    document.getElementById("resultatIA3").textContent = data.ia3?.response || "Pas de réponse";

  } catch (err) {
    console.error("Erreur:", err);
  }
}

// Exemple de bouton pour envoyer le message
document.getElementById("envoyerBtn").addEventListener("click", () => {
  const message = document.getElementById("inputMessage").value;
  envoyerMessage(message);
});
