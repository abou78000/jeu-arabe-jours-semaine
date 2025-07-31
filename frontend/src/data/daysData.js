// Données des jours de la semaine en arabe avec fichiers audio
export const daysData = [
  {
    id: 1,
    arabic: "الأَحَد",
    french: "Dimanche",
    audioUrl: "https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/pg71kylx_dimanche.mp3"
  },
  {
    id: 2,
    arabic: "الِاثْنَيْن",
    french: "Lundi", 
    audioUrl: "https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/ij77ggqs_lundi.mp3"
  },
  {
    id: 3,
    arabic: "الثُّلاثَاء",
    french: "Mardi",
    audioUrl: null // En attente du fichier audio
  },
  {
    id: 4,
    arabic: "الأَرْبِعَاء",
    french: "Mercredi",
    audioUrl: "https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/lhkkuz77_mercredi.mp3"
  },
  {
    id: 5,
    arabic: "الخَمِيس",
    french: "Jeudi",
    audioUrl: "https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/1vwt7m0y_jeudi.mp3"
  },
  {
    id: 6,
    arabic: "الجُمُعَة",
    french: "Vendredi",
    audioUrl: null // En attente du fichier audio
  },
  {
    id: 7,
    arabic: "السَّبْت",
    french: "Samedi",
    audioUrl: "https://customer-assets.emergentagent.com/job_learn-arabic-days/artifacts/imagp50m_samedi.mp3"
  }
];

// Hook pour jouer l'audio
export const useAudio = () => {
  const playAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(console.error);
    }
  };

  return { playAudio };
};