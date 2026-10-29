# R十P — Rest in Peace · Team PUBG Mobile

Site vitrine de l'équipe compétitive **Rest in Peace (R十P)** : roster, résultats, actualités, histoire de la team et candidature. Site 100 % statique : HTML, CSS et JavaScript sans framework, déployé sur GitHub Pages.

## Aperçu

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Hero, dernier tournoi, stats, roster, résultats et actus récents |
| Joueurs | `joueur.html`, `player-detail.html?id=N` | Roster et profil PUBGM complet (rang, stats Solo/Duo/Squad, armes, cartes, réglages, derniers matchs) |
| Résultats | `results.html` | Tournois filtrables (année, victoires) et derniers matchs |
| Actus | `news.html` | Articles filtrables par catégorie |
| À propos | `about.html` | Mission, valeurs, parcours, organisation |
| Partenaires | `partners.html` | Partenaires et sponsors (depuis `site.json`), appel à collaboration |
| Contact | `contact.html` | Formulaire, réseaux, FAQ |
| Rejoindre | `inscription.html` | Formulaire de candidature (sans compte ni mot de passe) |
| Légal | `legal.html` | Mentions légales, confidentialité, cookies et services tiers |

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
├── assets/               # favicon.svg, apple-touch-icon, og-image, anciennes icônes .ico
├── scripts/build_seo.py  # génère sitemap.xml et robots.txt
├── sitemap.xml, robots.txt
├── docs/CONTENU.md       # guide d'édition du contenu
└── .github/workflows/    # déploiement GitHub Pages
```

## Design

- Style esport : fond sombre, grille subtile, angles coupés, un seul bleu d'accent (`--blue`, `--blue-d` pour les surfaces pleines), sans dégradé, titres en Rajdhani et texte en Inter, **polices auto-hébergées** dans `assets/fonts/` (licence OFL, fichiers de licence inclus). Deux micro-polices (< 1 Ko chacune, extraites de Noto Sans SC et Noto Sans Arabic) fournissent uniquement les caractères **十** (logo R十P) et **٭** (pseudos R十P٭NOM), pour qu'ils s'affichent à l'identique sur tous les appareils.
- Tous les tokens (couleurs, découpe `--cut`, hauteur de nav, polices) sont dans `:root` en tête de `css/style.css`.
- **Responsive mobile-first** : grilles `auto-fit`, tiroir de navigation sous 1080 px, aucun défilement horizontal testé à 375 px et 1280 px.
- **Navigation** : header translucide, lien actif, barre de progression de lecture, tiroir latéral avec overlay (fermeture par clic, lien ou `Échap`), bouton retour en haut.
- **Accessibilité** : lien d'évitement, `aria-current`, `aria-expanded`, focus visible, `prefers-reduced-motion` respecté.

## Thème clair / sombre

Le thème suit la préférence du système au premier chargement, puis le choix de l'utilisateur (bouton soleil/lune du header) est mémorisé dans `localStorage`. Un petit script dans le `<head>` applique le thème avant l'affichage pour éviter tout flash. Le thème clair ne redéfinit que les tokens (`:root[data-theme=light]` dans `css/style.css`) : toute nouvelle couleur doit passer par une variable.

## SEO et performance

- Chaque page a son `<title>`, sa description, une URL canonique, des balises Open Graph / Twitter (image 1200×630 dans `assets/og-image.png`) ; la page d'accueil porte aussi un JSON-LD `Organization`. Les profils joueurs mettent à jour titre, description et canonical dynamiquement.
- **URL de base** : par défaut `https://josoavj.github.io/restPeacePUBGM/`. Si le site est servi ailleurs (domaine personnalisé), remplace-la partout puis régénère le sitemap :

```bash
grep -rl "josoavj.github.io/restPeacePUBGM" --include=*.html . | xargs sed -i 's#https://josoavj.github.io/restPeacePUBGM/#https://ton-domaine.tld/#g'
python scripts/build_seo.py https://ton-domaine.tld/
```

- Relance `python scripts/build_seo.py` après l'ajout d'une page ou d'un joueur.
- Font Awesome est chargé sans bloquer l'affichage, le favicon est un SVG de 256 octets (l'ancien `.ico` pesait 250 Ko), et un menu de secours s'affiche sans JavaScript.

## Formulaires

Le site n'a pas de backend. Dans `data/site.json` :

- `formEndpoint` renseigné (par exemple un endpoint [Formspree](https://formspree.io)) : les formulaires envoient du JSON en POST vers cette URL.
- `formEndpoint` vide (défaut) : un `mailto:` pré-rempli vers `team.email` est ouvert.

Un champ piège (`website`) filtre les robots les plus simples.

## Déploiement

Le workflow `.github/workflows/static.yml` publie le dépôt sur GitHub Pages à chaque push sur `master`. Activer *Settings → Pages → Source : GitHub Actions*.


## Licence

Projet développé par **josoavj** pour la team Rest in Peace (R十P).
