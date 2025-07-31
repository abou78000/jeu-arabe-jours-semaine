# 🎯 Instructions de Déploiement - Jeu Éducatif Arabe

## 📁 Préparation des fichiers audio

Votre projet est maintenant configuré pour utiliser des fichiers audio locaux. Suivez ces étapes :

### 1. Télécharger les fichiers audio
Téléchargez chacun des fichiers audio suivants et renommez-les :

| Fichier original | Nouveau nom | URL de téléchargement |
|------------------|-------------|----------------------|
| `pg71kylx_dimanche.mp3` | `dimanche.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/pg71kylx_dimanche.mp3 |
| `ij77ggqs_lundi.mp3` | `lundi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/ij77ggqs_lundi.mp3 |
| `lvvmy320_mardi.mp3` | `mardi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/lvvmy320_mardi.mp3 |
| `lhkkuz77_mercredi.mp3` | `mercredi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/lhkkuz77_mercredi.mp3 |
| `1vwt7m0y_jeudi.mp3` | `jeudi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/1vwt7m0y_jeudi.mp3 |
| `x4jg3wdo_vendredi.mp3` | `vendredi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/x4jg3wdo_vendredi.mp3 |
| `imagp50m_samedi.mp3` | `samedi.mp3` | https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/imagp50m_samedi.mp3 |

### 2. Structure des dossiers après téléchargement
```
frontend/
├── public/
│   ├── audio/
│   │   ├── dimanche.mp3
│   │   ├── lundi.mp3
│   │   ├── mardi.mp3
│   │   ├── mercredi.mp3
│   │   ├── jeudi.mp3
│   │   ├── vendredi.mp3
│   │   └── samedi.mp3
│   ├── index.html
│   └── favicon.ico
├── src/
└── package.json
```

## 🚀 Options de déploiement

### Option 1 : GitHub Pages (Gratuit)
1. **Poussez votre code sur GitHub** via Emergent
2. **Uploadez les fichiers audio** dans le dossier `public/audio/`
3. **Activez GitHub Pages** :
   - Repository Settings → Pages
   - Source : Deploy from a branch
   - Branch : main (ou votre branche principale)
4. **Accédez à votre site** : `https://votre-username.github.io/nom-du-repo`

### Option 2 : Netlify (Gratuit avec plus de fonctionnalités)
1. **Connectez votre repository GitHub** à Netlify
2. **Configuration automatique** pour React détectée
3. **Uploadez les fichiers audio** dans `public/audio/`
4. **Déploiement automatique** à chaque push
5. **URL personnalisée** : `https://nom-de-votre-choix.netlify.app`

### Option 3 : Vercel (Gratuit, optimisé React)
1. **Connectez votre GitHub** à Vercel
2. **Import automatique** du projet React
3. **Ajoutez les fichiers audio** dans `public/audio/`
4. **Déploiement instantané** 
5. **Domaine personnalisé** disponible

## 🎵 Test des fichiers audio

Après déploiement, testez que tous les boutons audio fonctionnent :
- Ouvrez votre site déployé
- Testez chaque jour dans l'onglet "Leçon"
- Vérifiez le son dans tous les onglets (Quiz, Mémoire, Association)

## 📱 Compatibilité navigateurs

Votre jeu est compatible avec :
- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Mobiles iOS et Android
- ✅ Tablettes

## 🔧 Dépannage audio

Si l'audio ne fonctionne pas après déploiement :
1. Vérifiez que les fichiers sont dans `public/audio/`
2. Vérifiez les noms de fichiers (sans espaces, en minuscules)
3. Testez l'URL directe : `https://votre-site.com/audio/dimanche.mp3`
4. Certains navigateurs bloquent l'autoplay - l'utilisateur doit cliquer d'abord

## 🎯 URL de partage

Une fois déployé, vous pourrez partager votre jeu éducatif avec :
- 👨‍🏫 Enseignants d'arabe
- 👶 Parents d'enfants apprenant l'arabe  
- 🎓 Étudiants en langue arabe
- 🌐 Communautés éducatives

Votre jeu sera accessible 24/7 depuis n'importe quel appareil connecté !