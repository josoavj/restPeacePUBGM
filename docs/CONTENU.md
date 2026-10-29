# Guide d'édition du contenu

Tout le contenu variable est dans `data/`. Pas besoin de toucher au HTML : ajoute ou modifie une entrée, le site se met à jour.

## `data/players-data.json`

Un joueur = un objet. `id` doit être unique (il sert dans `player-detail.html?id=7`).

**Pseudo** : toujours au format `R十P٭NOM` (十 = U+5341, ٭ = U+066D ; copie-colle un pseudo existant). Le titre du profil et des cartes affiche le pseudo complet ; à la place de la photo, le site affiche le nom seul (`NOM`, tout ce qui suit le ٭), dont la taille s'adapte à sa longueur.

```json
{ "id": 7, "name": "R十P٭PSEUDO", "role": "Sniper", "position": "Tireur", "bio": "…", "joinDate": "2025-01-15",
  "stats": { "totalMatches": 100, "wins": 20, "top4": 50, "avgKill": 3.5, "winRate": "20.0%", "avgDamage": 280.1 },
  "pubgId": "5123456789", "region": "Afrique", "crew": "Rest in Peace", "perspective": "TPP",
  "tier": { "name": "Conquérant", "points": 5100 },
  "modes": { "solo": {…}, "duo": {…}, "squad": {…} },
  "weapons": [ { "name": "M416", "kills": 400, "headshot": 31.5 } ],
  "maps": [ { "name": "Erangel", "matches": 120, "winRate": 22.5 } ],
  "controls": { "device": "Android", "fingers": 4, "gyroscope": true, "graphics": "HD", "fps": "Extrême (60 FPS)",
                "sensitivity": { "camera": 110, "ads": 48, "gyro": 200 } },
  "recent": [ { "map": "Erangel", "mode": "Squad", "rank": 1, "kills": 6, "damage": 780, "survival": 1320 } ],
  "achievements": ["…"], "strengths": ["…"] }
```

Chaque entrée de `modes` : `matches`, `wins`, `top10`, `kills`, `kd`, `avgKills`, `headshot` (%), `avgDamage`, `survival` (secondes), `longestKill` (m), `maxKills`, `assists`, `revives`. Rangs PUBG Mobile : Bronze, Argent, Or, Platine, Diamant, Couronne, As, Maître As, Dominateur As, Conquérant. `rank` d'un match récent : classement final (1 = Chicken Dinner). `survival` est en secondes.

> Les valeurs fournies dans le dépôt sont des exemples : remplace-les par les chiffres réels (captures du profil en jeu).

## `data/results.json`

- `tournaments[]` : `year`, `name`, `date`, `meta` (lieu ou format), `prize`, `place` (texte affiché), `tier` (`win`, `top4` ou `top8`), `teams`, `rounds`, `desc`. Le premier élément alimente la carte « Dernier tournoi » de l'accueil : garde la liste du plus récent au plus ancien.
- `matches[]` : `home`, `away`, `hs`, `as` (scores), `date`, `type`, `note`.

## `data/news.json`

`news[]` : `date`, `cat` (`tournament`, `announcement`, `player`, `update`), `title`, `excerpt` et `body` optionnel (l'article se déplie si présent).

## `data/site.json`

`team` (nom, email, ville), `socials[]` (label, icône Font Awesome, url), `stats[]` (valeur, libellé), `partners[]` (`name`, `type`, `desc`, `url` facultatif, affichés sur `partners.html`) et `formEndpoint` (voir README). L'email est aussi repris automatiquement dans `legal.html`.

## Nouvelle page ou nouveau joueur

Après l'ajout d'un joueur ou d'une page, relance `python scripts/build_seo.py` pour mettre à jour `sitemap.xml`.

## Statistiques et pages statiques

Les textes de `about.html` (mission, valeurs, parcours, organisation) et la FAQ de `contact.html` sont écrits directement dans le HTML.
