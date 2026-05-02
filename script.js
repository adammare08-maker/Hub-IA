// Génération de TEXTE
async function generateText(prompt) {
  try {
    const response = await fetch('https://hub-iaeuro.adam-mare08.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'text',
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la génération');
    }

    return data.result;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

// Génération d'IMAGE
async function generateImage(prompt) {
  try {
    const response = await fetch('https://hub-iaeuro.adam-mare08.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'image',
        prompt: prompt
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la génération');
    }

    return data.result; // URL de l'image
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

// Exemple d'utilisation avec des boutons
document.getElementById('btnText')?.addEventListener('click', async () => {
  const prompt = document.getElementById('promptText').value;
  const result = await generateText(prompt);
  document.getElementById('resultText').textContent = result;
});

document.getElementById('btnImage')?.addEventListener('click', async () => {
  const prompt = document.getElementById('promptImage').value;
  const imageUrl = await generateImage(prompt);
  document.getElementById('resultImage').src = imageUrl;
});
