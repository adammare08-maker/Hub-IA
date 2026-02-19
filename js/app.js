const btn = document.getElementById("generate");
const output = document.getElementById("output");

btn.onclick = async () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) return alert("Entre un prompt");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    console.log("Réponse serveur :", data);

    output.innerText = data.text;

  } catch (e) {
    console.error("Erreur fetch :", e);
    output.innerText = "Erreur IA";
  }
};
