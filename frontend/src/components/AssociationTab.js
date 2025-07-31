import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RotateCcw, Trophy, Volume2 } from "lucide-react";
import { daysData, useAudio } from "../data/daysData";

const AssociationTab = () => {
  const { playAudio } = useAudio();
  const [arabicDays, setArabicDays] = useState([]);
  const [frenchDays, setFrenchDays] = useState([]);
  const [selectedArabic, setSelectedArabic] = useState(null);
  const [selectedFrench, setSelectedFrench] = useState(null);
  const [connections, setConnections] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameComplete, setGameComplete] = useState(false);

  // Initialiser le jeu
  const initializeGame = () => {
    const shuffledFrench = [...daysData]
      .sort(() => Math.random() - 0.5);
    
    setArabicDays(daysData);
    setFrenchDays(shuffledFrench);
    setSelectedArabic(null);
    setSelectedFrench(null);
    setConnections([]);
    setScore({ correct: 0, incorrect: 0 });
    setGameComplete(false);
  };

  // Sélectionner un jour arabe
  const selectArabicDay = (day) => {
    if (connections.some(conn => conn.arabicId === day.id)) return;
    setSelectedArabic(day);
  };

  // Sélectionner un jour français
  const selectFrenchDay = (day) => {
    if (connections.some(conn => conn.frenchId === day.id)) return;
    setSelectedFrench(day);
  };

  // Vérifier la connexion
  useEffect(() => {
    if (selectedArabic && selectedFrench) {
      const isCorrect = selectedArabic.id === selectedFrench.id;
      
      if (isCorrect) {
        // Connexion correcte
        setConnections(prev => [...prev, {
          arabicId: selectedArabic.id,
          frenchId: selectedFrench.id,
          isCorrect: true
        }]);
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        
        // Vérifier si le jeu est terminé
        if (connections.length + 1 === daysData.length) {
          setGameComplete(true);
        }
      } else {
        // Connexion incorrecte
        setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
        
        // Montrer l'erreur temporairement
        setConnections(prev => [...prev, {
          arabicId: selectedArabic.id,
          frenchId: selectedFrench.id,
          isCorrect: false
        }]);
        
        // Supprimer la connexion incorrecte après 1 seconde
        setTimeout(() => {
          setConnections(prev => prev.filter(conn => 
            !(conn.arabicId === selectedArabic.id && conn.frenchId === selectedFrench.id)
          ));
        }, 1000);
      }
      
      setSelectedArabic(null);
      setSelectedFrench(null);
    }
  }, [selectedArabic, selectedFrench, connections.length]);

  // Vérifier si un jour est connecté
  const isConnected = (dayId, type) => {
    return connections.some(conn => 
      type === 'arabic' ? conn.arabicId === dayId : conn.frenchId === dayId
    );
  };

  // Obtenir la couleur de la connexion
  const getConnectionColor = (dayId, type) => {
    const connection = connections.find(conn => 
      type === 'arabic' ? conn.arabicId === dayId : conn.frenchId === dayId
    );
    
    if (!connection) return '';
    return connection.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
  };

  // Initialiser au montage
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-orange-600">
          🔗 Association des jours
        </CardTitle>
        <p className="text-gray-600">
          Clique sur un jour en arabe puis sur sa traduction française
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✅ Correct: {score.correct}
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600">
            ❌ Incorrect: {score.incorrect}
          </Badge>
        </div>
      </CardHeader>

      {gameComplete && (
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-300">
          <CardContent className="p-6 text-center">
            <Trophy className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-orange-700 mb-2">
              🎉 Parfait ! 🎉
            </h3>
            <p className="text-orange-600">
              Toutes les associations trouvées ! Score final : {score.correct} bonnes réponses, {score.incorrect} erreurs
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne Arabe */}
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-purple-50 text-center">
            <CardTitle className="text-xl text-purple-700">
              أيام الأسبوع بالعربية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {arabicDays.map((day) => (
                <Card
                  key={`arabic-${day.id}`}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedArabic?.id === day.id
                      ? "border-purple-500 bg-purple-50 shadow-lg"
                      : isConnected(day.id, 'arabic')
                      ? getConnectionColor(day.id, 'arabic')
                      : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                  }`}
                  onClick={() => selectArabicDay(day)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div 
                      className="text-2xl font-bold text-purple-700"
                      style={{ 
                        fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                        lineHeight: '1.6'
                      }}
                    >
                      {day.arabic}
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(day.audioUrl);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Colonne Française */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50 text-center">
            <CardTitle className="text-xl text-blue-700">
              Jours de la semaine en français
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {frenchDays.map((day) => (
                <Card
                  key={`french-${day.id}`}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedFrench?.id === day.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : isConnected(day.id, 'french')
                      ? getConnectionColor(day.id, 'french')
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => selectFrenchDay(day)}
                >
                  <CardContent className="p-4">
                    <div className="text-xl font-semibold text-blue-700">
                      {day.french}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-center text-blue-800">
            💡 <strong>Instructions :</strong> Sélectionne d'abord un jour en arabe (colonne de gauche), 
            puis clique sur sa traduction française (colonne de droite)
          </p>
        </CardContent>
      </Card>

      {/* Bouton reset */}
      <div className="text-center">
        <Button onClick={initializeGame} variant="outline" size="lg">
          <RotateCcw className="w-5 h-5 mr-2" />
          Recommencer
        </Button>
      </div>
    </div>
  );
};

export default AssociationTab;