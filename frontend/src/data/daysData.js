// Données des jours de la semaine en arabe avec fichiers audio
export const daysData = [
  {
    id: 1,
    arabic: "الأَحَد",
    french: "Dimanche",
    audioUrl: "/audio/dimanche.mp3"
  },
  {
    id: 2,
    arabic: "الِاثْنَيْن",
    french: "Lundi", 
    audioUrl: "/audio/lundi.mp3"
  },
  {
    id: 3,
    arabic: "الثُّلاثَاء",
    french: "Mardi",
    audioUrl: "/audio/mardi.mp3"
  },
  {
    id: 4,
    arabic: "الأَرْبِعَاء",
    french: "Mercredi",
    audioUrl: "/audio/mercredi.mp3"
  },
  {
    id: 5,
    arabic: "الخَمِيس",
    french: "Jeudi",
    audioUrl: "/audio/jeudi.mp3"
  },
  {
    id: 6,
    arabic: "الجُمُعَة",
    french: "Vendredi",
    audioUrl: "/audio/vendredi.mp3"
  },
  {
    id: 7,
    arabic: "السَّبْت",
    french: "Samedi",
    audioUrl: "/audio/samedi.mp3"
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