const btn = document.getElementById("generate");
const output = document.getElementById("output");

btn.onclick = async () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) return alert("Entre un prompt");

  btn.disabled = true;
  btn.innerText = "Génération...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    output.innerText = data.text || data.error || "Erreur IA";
    output.classList.remove("hidden");

  } catch (e) {
    console.error(e);
    output.innerText = "Erreur IA";
    output.classList.remove("hidden");
  }

  btn.disabled = false;
  btn.innerText = "Générer";
};
