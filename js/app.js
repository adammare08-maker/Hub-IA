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

    const data = await res.json();

    // ✅ on affiche la réponse envoyée par le backend
    output.innerText = data.text;

    output.classList.remove("hidden");
  } catch (e) {
    console.error(e);
    output.innerText = "Erreur IA";
    output.classList.remove("hidden");
  }

  btn.disabled = false;
  btn.innerText = "Générer";
};
