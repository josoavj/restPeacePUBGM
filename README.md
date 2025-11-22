# R+P - Rest in Peace Team PUBG Mobile

## 📱 À propos du Projet

**R+P (Rest in Peace)** est un site web complet dédié à une équipe compétitive PUBG Mobile. Le site est conçu pour présenter les joueurs, les résultats des tournois, les actualités de la team, et permettre les inscriptions.

### 🎯 Objectifs
- Présenter la team et ses joueurs
- Afficher les résultats et statistiques
- Partager les actualités et annonces
- Permettre aux nouveaux joueurs de postuler
- Offrir une interface de contact fluide

---

## 🚀 Fonctionnalités Principales

### 📄 Pages Disponibles
1. **Accueil** (`index.html`) - Page principale avec overview de la team
2. **Joueurs** (`joueur.html`) - Profils détaillés des joueurs avec stats
3. **Résultats** (`results.html`) - Historique des tournois et matchs
4. **Actualités** (`news.html`) - Blog et annonces de la team
5. **À Propos** (`about.html`) - Histoire et valeurs de la team
6. **Contact** (`contact.html`) - Formulaire de contact et FAQ
7. **Inscription** (`inscription.html`) - Formulaire d'adhésion à la team

### 🎨 Design & UX Améliorés
- **Design moderne** : Interface dark mode avec dégradés élégants
- **Responsive** : Parfaitement adapté mobile, tablette et desktop
- **Animations fluides** : Transitions et effets visuels agréables
- **Accessibilité** : Couleurs contrastées, navigation claire
- **Performance** : Chargement rapide, pas de dépendances lourdes

### ⚡ Fonctionnalités Interactives
- Navigation sticky avec adaptation au défilement
- Filtrage dynamique des actualités et résultats
- Formulaires avec validation en temps réel
- FAQ accordéon sur la page contact
- Bouton retour en haut automatique
- Animations d'apparition au défilement

---

## 🛠️ Stack Technologique

- **HTML5** - Markup sémantique
- **CSS3** - Styles modernes (Flexbox, Grid, Variables CSS)
- **JavaScript Vanilla** - Aucun framework, code pur
- **Font Awesome 6** - Icônes
- **Google Fonts** - Poppins font

---

## 📁 Structure du Projet

```
restPeacePUBGM/
├── index.html              # Page d'accueil
├── joueur.html             # Page des joueurs
├── results.html            # Page des résultats
├── news.html               # Page des actualités
├── about.html              # Page À Propos
├── contact.html            # Page de contact
├── inscription.html        # Formulaire d'inscription
├── CSS/
│   ├── index.css           # Styles principaux
│   ├── inscription.css     # Styles du formulaire
│   ├── joueur.css          # Styles des joueurs
│   ├── about.css           # Styles À Propos
│   ├── results.css         # Styles résultats
│   ├── news.css            # Styles actualités
│   └── contact.css         # Styles contact
├── JS/
│   ├── index.js            # Logique principale
│   ├── inscription.js      # Validation formulaire
│   ├── news.js             # Filtrage actualités
│   ├── contact.js          # Gestion contact et FAQ
│   └── Template.js         # Utilitaires
├── Icône/
│   └── ARCN.ico            # Favicon
└── README.md               # Ce fichier
```

---

## 🎮 Contenu de la Team

### Joueurs Principaux
- **JENZEN** - IGL (In-Game Leader)
- **GHOST** - Entry Fragger
- **BANG** - Flanker/Support
- **HADES** - Sniper/Recon
- **HADYX** - Sniper
- **LOKI** - Recon

### Réussite
- **12** Tournois gagnés en 2025
- **45+** Compétitions disputées
- **2.3M+** Points cumulés
- **Top 4** International 2025

---

## 📋 Formulaires & Validation

### Formulaire d'Inscription
Valide les éléments suivants :
- ✅ Nom complet (min. 3 caractères)
- ✅ Âge minimum (13 ans)
- ✅ Email valide
- ✅ Pseudo PUBG unique
- ✅ ID PUBG (10 chiffres)
- ✅ Mot de passe fort (min. 8 caractères)
- ✅ Spécialités sélectionnées

### Formulaire de Contact
Avec catégories :
- Candidature/Recrutement
- Partenariat/Sponsoring
- Demande Média
- Événements
- Feedback

---

## 🌐 Réseaux Sociaux

La team est disponible sur :
- **Discord** - Serveur communautaire
- **Twitter/X** - Annonces et mises à jour
- **Instagram** - Contenu visuel
- **YouTube** - Vidéos et replays
- **Twitch** - Streams en direct
- **Facebook** - Page officielle

---

## 💻 Installation & Utilisation

### Pour consulter le site localement :

```bash
# 1. Cloner le repository
git clone https://github.com/josoavj/restPeacePUBGM.git

# 2. Naviguer vers le dossier
cd restPeacePUBGM

# 3. Ouvrir dans un navigateur
# Ouvrir index.html directement ou utiliser un serveur local
python -m http.server 8000  # Python 3
# Puis accéder à http://localhost:8000
```

---

## 🎨 Personnalisation

### Modifier les Couleurs
Éditer les variables CSS dans `CSS/index.css` :
```css
:root {
    --primary-color: #256beb;      /* Bleu principal */
    --secondary-color: #1de2a7;    /* Vert/Cyan */
    --background-dark: #10192d;    /* Fond */
    /* ... */
}
```

### Ajouter des Joueurs
Éditer `joueur.html` et ajouter des cartes :
```html
<article class="player-card">
    <img src="URL_AVATAR" alt="Nom">
    <h3>R+P~NOM</h3>
    <p class="role">Rôle: ...</p>
    <!-- ... -->
</article>
```

---

## 📱 Responsive Design

- **Desktop** : Layout complet avec tous les détails
- **Tablette** : Grilles adaptées (2 colonnes)
- **Mobile** : Une seule colonne, navigation simplifiée

Les breakpoints utilisés :
- `768px` - Transition desktop/tablette
- `480px` - Transition tablette/mobile

---

## 🚀 Optimisations Future

- [ ] Ajouter une page de statistiques détaillées
- [ ] Implémenter un système de commentaires
- [ ] Intégrer les APIs des réseaux sociaux
- [ ] Ajouter un système d'authentification
- [ ] Implémenter une base de données
- [ ] Créer une app mobile
- [ ] Ajouter des vidéos intégrées
- [ ] Système de notifications

---

## 📝 Licence

Ce projet est développé par **josoavj** pour la team **Rest in Peace (R+P)**.

---

## 📞 Contact & Support

- **Email** : contact@restinpeace.team
- **GitHub** : [github.com/josoavj](https://github.com/josoavj)
- **Discord** : Rejoignez notre serveur
- **Site** : [restinpeace.team](https://restinpeace.team)

---

## 🙏 Remerciements

Merci à :
- L'équipe Rest in Peace pour leur dévouement
- La communauté PUBG Mobile
- Tous les sponsors et partenaires

---

**Dernière mise à jour** : 22 Novembre 2025  
**Version** : 2.0 - Complete Redesign & Enhancement
