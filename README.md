# 🎮 Jeu Éducatif : أيام الأسبوع (Jours de la semaine en arabe)

Une application React interactive pour apprendre les jours de la semaine en arabe avec audio, quiz et jeux de mémoire.

## ✨ Fonctionnalités

### 📚 Onglet Leçon
- 7 jours de la semaine en arabe avec voyelles (tashkīl)
- Calligraphie lisible avec police Amiri
- Traduction française sous chaque jour
- Boutons audio pour la prononciation

### 🧠 Onglet Quiz 
- Questions aléatoires avec choix multiples
- Limite de 7 questions par partie
- Système de score avec compteur
- Audio pour chaque question

### 🎯 Onglet Mémoire
- Jeu de memory avec cartes arabe/français
- 14 cartes à associer par paires
- Score : paires trouvées vs erreurs
- Félicitations pour score parfait

### 🔗 Onglet Association
- Relier les jours arabes aux traductions françaises
- Interface à deux colonnes
- Feedback visuel pour les bonnes/mauvaises réponses
- Boutons audio intégrés

## 🛠️ Technologies utilisées

- **React 19** - Framework principal
- **Tailwind CSS** - Styling moderne
- **shadcn/ui** - Composants UI élégants
- **Lucide React** - Icônes
- **Google Fonts** - Police arabe (Amiri, Noto Naskh Arabic)

## 📱 Design

- Interface colorée adaptée aux enfants
- Design responsive (mobile, tablette, desktop)
- Animations et transitions fluides
- Thème moderne avec gradients subtils

## 🌍 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS et Android
- ✅ Tablettes et mobiles
- ✅ Lecteurs d'écran (accessibilité)

## 🎯 Public cible

- Enfants apprenant l'arabe
- Étudiants débutants en arabe
- Enseignants de langue arabe
- Parents souhaitant enseigner l'arabe

## 🚀 Installation locale

```bash
# Cloner le repository
git clone [votre-repo-url]

# Installer les dépendances
cd frontend
yarn install

# Ajouter les fichiers audio dans public/audio/
# (voir DEPLOYMENT_INSTRUCTIONS.md)

# Lancer en mode développement
yarn start
```

## 📊 Structure du projet

```
src/
├── components/
│   ├── ui/                 # Composants shadcn
│   ├── LessonTab.js        # Onglet leçon
│   ├── QuizTab.js          # Onglet quiz  
│   ├── MemoryTab.js        # Jeu de mémoire
│   └── AssociationTab.js   # Jeu d'association
├── data/
│   └── daysData.js         # Données des jours + hook audio
└── App.js                  # Composant principal
```

## 🎵 Fichiers audio requis

7 fichiers MP3 à placer dans `public/audio/` :
- dimanche.mp3, lundi.mp3, mardi.mp3
- mercredi.mp3, jeudi.mp3, vendredi.mp3, samedi.mp3

## 📜 Licence

Projet éducatif open source - libre d'utilisation pour l'enseignement.

---

🌟 **Créé avec Emergent AI** - Pour l'apprentissage ludique de l'arabe
