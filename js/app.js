const btn = document.getElementById("generate");
const output = document.getElementById("output");

btn.onclick = async () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) return alert("Entre un prompt");

  btn.disabled = true;
  btn.innerText = "Génération...";

  try {
    const res = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    // 👉 Vérifie si le serveur répond bien
    if (!res.ok) {
      throw new Error("Serveur a répondu avec une erreur");
    }

    const data = await res.json();

    console.log("Réponse serveur :", data); // 👈 pour debug

    output.innerText = data.text || "Pas de réponse IA";
    output.classList.remove("hidden");

  } catch (e) {
    console.error("Erreur fetch :", e);
    output.innerText = "Erreur IA";
    output.classList.remove("hidden");
  }

  btn.disabled = false;
  btn.innerText = "Générer";
};
