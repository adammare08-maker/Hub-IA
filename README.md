# IA Hub

Plateforme regroupant plusieurs outils IA (texte, codage, vision, image) au même endroit.

## Architecture

| Partie | Hébergement | Fichiers |
|---|---|---|
| Frontend | Vercel | `index.html` |
| Backend | Vercel (fonction serverless) | `api/generate.js` |

Le backend utilise **Groq** (gratuit et rapide), compatible avec l'API d'OpenAI.

---

## Déploiement

Le site est hébergé sur **Vercel** et connecté à ce dépôt GitHub.
À chaque `git push` sur la branche `main`, Vercel redéploie automatiquement.

### Configuration de la clé API

1. Crée une clé sur [console.groq.com](https://console.groq.com) (gratuit).
2. Dans Vercel : **Settings → Environment Variables**.
3. Ajoute la variable :
   - **Nom** : `GROQ_API_KEY`
   - **Valeur** : ta clé (`gsk_...`)
4. Clique sur **Save**, puis lance un **Redeploy**.

> La clé reste secrète : elle est stockée uniquement dans Vercel, jamais dans le code.

---

## Fonctionnement

- Le frontend envoie une requête `POST` vers `/api/generate` avec `{ prompt, systemPrompt }`.
- La fonction serverless appelle l'API Groq et renvoie `{ text }`.

## Développement local

```bash
npm install -g vercel
vercel dev
```

Le site tourne alors sur `http://localhost:3000`.
