# R+P — Rest in Peace · Team PUBG Mobile

Site vitrine de l'équipe compétitive **Rest in Peace (R+P)** : roster, résultats, actualités, histoire de la team et candidature. Site 100 % statique : HTML, CSS et JavaScript sans framework, déployé sur GitHub Pages.

## Aperçu

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Hero, dernier tournoi, stats, roster, résultats et actus récents |
| Joueurs | `joueur.html`, `player-detail.html?id=N` | Roster et profil PUBGM complet (rang, stats Solo/Duo/Squad, armes, cartes, réglages, derniers matchs) |
| Résultats | `results.html` | Tournois filtrables (année, victoires) et derniers matchs |
| Actus | `news.html` | Articles filtrables par catégorie |
| À propos | `about.html` | Mission, valeurs, parcours, organisation |
| Contact | `contact.html` | Formulaire, réseaux, FAQ |
| Rejoindre | `inscription.html` | Formulaire de candidature (sans compte ni mot de passe) |

## Lancer en local

Les pages chargent leurs données avec `fetch`, ce qui ne fonctionne pas en ouvrant les fichiers directement (`file://`). Utilise un serveur local :

```bash
git clone https://github.com/josoavj/restPeacePUBGM.git
cd restPeacePUBGM
python -m http.server 8000   # puis http://localhost:8000
```

## Structure

```
├── *.html                # pages (coquilles légères, données injectées par JS)
├── css/style.css         # design system unique (tokens, composants, responsive)
├── js/main.js            # nav, footer, rendu JSON, formulaires
├── data/                 # contenu éditable : site, players-data, results, news
├── assets/               # favicon et icônes
├── docs/CONTENU.md       # guide d'édition du contenu
└── .github/workflows/    # déploiement GitHub Pages
```

## Design

- Style esport : fond sombre, grille subtile, angles coupés, un seul bleu d'accent (`--blue`, `--blue-d` pour les surfaces pleines), sans dégradé, titres en Rajdhani et texte en Inter.
- Tous les tokens (couleurs, découpe `--cut`, hauteur de nav, polices) sont dans `:root` en tête de `css/style.css`.
- **Responsive mobile-first** : grilles `auto-fit`, tiroir de navigation sous 1080 px, aucun défilement horizontal testé à 375 px et 1280 px.
- **Navigation** : header translucide, lien actif, barre de progression de lecture, tiroir latéral avec overlay (fermeture par clic, lien ou `Échap`), bouton retour en haut.
- **Accessibilité** : lien d'évitement, `aria-current`, `aria-expanded`, focus visible, `prefers-reduced-motion` respecté.

## Formulaires

Le site n'a pas de backend. Dans `data/site.json` :

- `formEndpoint` renseigné (par exemple un endpoint [Formspree](https://formspree.io)) : les formulaires envoient du JSON en POST vers cette URL.
- `formEndpoint` vide (défaut) : un `mailto:` pré-rempli vers `team.email` est ouvert.

Un champ piège (`website`) filtre les robots les plus simples.

## Déploiement

Le workflow `.github/workflows/static.yml` publie le dépôt sur GitHub Pages à chaque push sur `master`. Activer *Settings → Pages → Source : GitHub Actions*.

## À vérifier avant la mise en ligne

- Les URLs des réseaux sociaux et l'email dans `data/site.json` (valeurs reprises de l'ancien site).
- Les contenus de `data/*.json`, qui sont des exemples à remplacer par les vrais résultats et joueurs. Les statistiques détaillées des profils (modes, armes, cartes, réglages, derniers matchs) et les ID PUBG sont des **valeurs d'exemple** à remplacer par les données réelles de chaque joueur.
- Ajouter de vraies photos de joueurs : voir `docs/CONTENU.md`.

## Licence

Projet développé par **josoavj** pour la team Rest in Peace (R+P).
