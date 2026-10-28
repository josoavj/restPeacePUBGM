# Guide d'édition du contenu

Tout le contenu variable est dans `data/`. Pas besoin de toucher au HTML : ajoute ou modifie une entrée, le site se met à jour.

## `data/players-data.json`

```json
{ "id": 7, "name": "R+P~PSEUDO", "role": "Sniper", "position": "Tireur",
  "bio": "…", "joinDate": "2025-01-15",
  "stats": { "totalMatches": 100, "wins": 20, "top4": 50, "avgKill": 3.5, "winRate": "20.0%", "avgDamage": 280.1 },
  "achievements": ["…"], "strengths": ["…"] }
```

`id` doit être unique (il sert dans `player-detail.html?id=7`). Le visuel est un monogramme généré depuis le pseudo.

## `data/results.json`

- `tournaments[]` : `year`, `name`, `date`, `meta` (lieu ou format), `prize`, `place` (texte affiché), `tier` (`win`, `top4` ou `top8`), `teams`, `rounds`, `desc`. Le premier élément alimente la carte « Dernier tournoi » de l'accueil : garde la liste du plus récent au plus ancien.
- `matches[]` : `home`, `away`, `hs`, `as` (scores), `date`, `type`, `note`.

## `data/news.json`

`news[]` : `date`, `cat` (`tournament`, `announcement`, `player`, `update`), `title`, `excerpt` et `body` optionnel (l'article se déplie si présent).

## `data/site.json`

`team` (nom, email, ville), `socials[]` (label, icône Font Awesome, url), `stats[]` (valeur, libellé) et `formEndpoint` (voir README).

## Statistiques et pages statiques

Les textes de `about.html` (mission, valeurs, parcours, organisation) et la FAQ de `contact.html` sont écrits directement dans le HTML.
