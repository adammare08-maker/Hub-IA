// URL de ton Worker Cloudflare — remplace par ton URL après déploiement
const API_URL = "https://iahub.TON-COMPTE.workers.dev/api/generate";

const TOOLS = {
  'lumina-scribe': {
    name: 'Lumina Scribe', icon: '✨', cat: 'IA Texte',
    placeholder: 'Ex : Rédige un email professionnel pour reporter une réunion…',
    system: 'Tu es Lumina Scribe, expert en rédaction. Fournis des textes clairs et professionnels. Réponds en français.'
  },
  'code-sage': {
    name: 'Code Sage', icon: '💻', cat: 'IA Code',
    placeholder: 'Ex : Écris une fonction JavaScript qui trie un tableau par date…',
    system: 'Tu es Code Sage, expert développeur. Fournis du code propre, commenté et expliqué. Réponds en français.'
  },
  'visionary-lens': {
    name: 'Visionary Lens', icon: '👁️', cat: 'IA Vision',
    placeholder: 'Ex : Décris cette image en détail ou pose une question à son sujet…',
    system: 'Tu es Visionary Lens, expert en analyse visuelle. Réponds en français.'
  },
  'pixel-alchemy': {
    name: 'Pixel Alchemy', icon: '🔮', cat: 'IA Image',
    placeholder: 'Ex : Un coucher de soleil sur la mer, style aquarelle…',
    system: 'Tu es Pixel Alchemy, expert en génération d\'images. L\'utilisateur te décrit une image. Crée une description détaillée, artistique et précise (prompt optimisé, palette de couleurs, style, ambiance, composition). Réponds en français.'
  }
};

let active_tool = null;

function show(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (page === 'home') document.getElementById('nav-home').classList.add('active');
  if (page === 'tools') document.getElementById('nav-tools').classList.add('active');
}

function open_tool(id) {
  show('tools');
  active_tool = id;
  const t = TOOLS[id];
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-id="${id}"]`).classList.add('active');

  document.getElementById('main').innerHTML = `
    <div class="playground">
      <div class="play-header">
        <span class="play-icon">${t.icon}</span>
        <div>
          <div class="play-title">${t.name}</div>
          <div class="play-cat">${t.cat}</div>
        </div>
      </div>
      <div class="play-body">
        <div>
          <div class="row-between" style="margin-bottom:6px">
            <span class="field-label">Prompt</span>
            <span class="char-count" id="cc">0 / 4000</span>
          </div>
          <textarea id="prompt" rows="6" maxlength="4000"
            placeholder="${t.placeholder}"
            oninput="on_input(this)"
            onkeydown="if((event.ctrlKey||event.metaKey)&&event.key==='Enter')run()"></textarea>
          <div style="font-size:11px;color:#bbb;margin-top:4px">Ctrl+Entrée pour générer</div>
        </div>
        <button class="btn-run" id="run-btn" onclick="run()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Générer
        </button>
        <div id="result"></div>
      </div>
    </div>
  `;
  document.getElementById('prompt').focus();
}

function on_input(el) {
  const n = el.value.length;
  const cc = document.getElementById('cc');
  cc.textContent = `${n} / 4000`;
  cc.className = 'char-count' + (n > 3600 ? ' warn' : '');
}

async function run() {
  const prompt = document.getElementById('prompt').value.trim();
  if (!prompt) { document.getElementById('prompt').focus(); return; }

  const btn = document.getElementById('run-btn');
  const res_el = document.getElementById('result');

  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Génération…';
  res_el.innerHTML = '';

  try {
    const r = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemPrompt: TOOLS[active_tool]?.system })
    });
    const data = await r.json();

    if (!r.ok) {
      res_el.innerHTML = `<div class="result-box"><div class="result-content result-error">⚠ ${data.error || 'Erreur inconnue'}</div></div>`;
    } else {
      res_el.innerHTML = `
        <div class="result-box">
          <div class="result-bar">
            <span class="result-label">Résultat</span>
            <button class="btn-copy" onclick="copy_result()">Copier</button>
          </div>
          <div class="result-content" id="result-text"></div>
        </div>`;
      document.getElementById('result-text').textContent = data.text;
    }
  } catch {
    res_el.innerHTML = `<div class="result-box"><div class="result-content result-error">⚠ Erreur réseau — vérifiez que le Worker Cloudflare est bien déployé.</div></div>`;
  }

  btn.disabled = false;
  btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Générer';
}

async function copy_result() {
  const t = document.getElementById('result-text')?.textContent || '';
  await navigator.clipboard.writeText(t).catch(() => {});
}
