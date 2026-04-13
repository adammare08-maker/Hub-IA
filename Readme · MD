# IA Hub

## Architecture

| Partie | Hébergement | Fichiers |
|---|---|---|
| Frontend | GitHub Pages | `index.html` |
| Backend | Cloudflare Workers | `server.js`, `wrangler.toml` |

---

## Déploiement en 3 étapes

### 1. Déployer le Worker Cloudflare

```bash
npm install
npx wrangler login
npx wrangler secret put LUMINA_SCRIBE_KEY
npx wrangler deploy
```

Wrangler affiche ton URL : `https://iahub.TON-COMPTE.workers.dev`

### 2. Mettre à jour l'URL dans index.html

Ligne 2 du `<script>` dans `index.html` :
```js
const API_URL = "https://iahub.TON-COMPTE.workers.dev/api/generate";
```

### 3. Activer GitHub Pages

Settings → Pages → Source: branche `main`, dossier `/` → Save

Ton site : `https://TON-PSEUDO.github.io/NOM-REPO`

---

## Dev local

```bash
npx wrangler dev
```

Le Worker tourne sur `http://localhost:8787`.
Dans `index.html`, mets temporairement `API_URL = "http://localhost:8787/api/generate"`.
