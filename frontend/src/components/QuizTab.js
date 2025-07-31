import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Volume2, Trophy, RotateCcw } from "lucide-react";
import { daysData, useAudio } from "../data/daysData";

const QuizTab = () => {
  const { playAudio } = useAudio();
  const [currentDay, setCurrentDay] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Générer une nouvelle question
  const generateQuestion = () => {
    // Vérifier si toutes les questions ont été posées
    if (questionsAsked.length >= 7 || gameComplete) {
      return;
    }

    // Trouver les jours non encore demandés
    const availableDays = daysData.filter(day => !questionsAsked.includes(day.id));
    
    if (availableDays.length === 0) {
      setGameComplete(true);
      return;
    }

    const randomDay = availableDays[Math.floor(Math.random() * availableDays.length)];
    setCurrentDay(randomDay);
    setQuestionsAsked(prev => [...prev, randomDay.id]);

    // Créer 3 options (1 correcte + 2 incorrectes)
    const correctAnswer = randomDay.french;
    const incorrectOptions = daysData
      .filter(day => day.french !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(day => day.french);

    const allOptions = [correctAnswer, ...incorrectOptions]
      .sort(() => Math.random() - 0.5);

    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
    setTotalQuestions(prev => prev + 1);
  };

  // Gérer la réponse
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentDay.french) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    // Vérifier si le jeu est terminé
    const newCorrect = answer === currentDay.french ? score.correct + 1 : score.correct;
    const newIncorrect = answer === currentDay.french ? score.incorrect : score.incorrect + 1;
    
    if (questionsAsked.length >= 7 || (newCorrect + newIncorrect >= 7)) {
      setGameComplete(true);
      return;
    }

    // Générer nouvelle question après 2 secondes
    setTimeout(generateQuestion, 2000);
  };

  // Réinitialiser le jeu
  const resetGame = () => {
    setScore({ correct: 0, incorrect: 0 });
    setGameComplete(false);
    setQuestionsAsked([]);
    setTotalQuestions(0);
    generateQuestion();
  };

  // Initialiser le jeu
  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-purple-600">
          🧠 Quiz des jours
        </CardTitle>
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✅ Correct: {score.correct}
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600">
            ❌ Incorrect: {score.incorrect}
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            📊 Questions: {totalQuestions}/7
          </Badge>
        </div>
      </CardHeader>

      {gameComplete && (
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
          <CardContent className="p-6 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-yellow-700 mb-2">
              🎉 Quiz terminé ! 🎉
            </h3>
            <p className="text-yellow-600">
              {score.correct === 7 
                ? "Score parfait ! Tu maîtrises les jours de la semaine en arabe !"
                : `Bien joué ! Score final : ${score.correct}/7 correct, ${score.incorrect} erreurs`
              }
            </p>
          </CardContent>
        </Card>
      )}

      {currentDay && !gameComplete && (
        <Card className="border-2 border-purple-200">
          <CardContent className="p-8 text-center">
            {/* Question */}
            <h3 className="text-lg text-gray-600 mb-4">
              Quel jour correspond à :
            </h3>

            {/* Jour en arabe */}
            <div 
              className="text-5xl font-bold mb-6 text-purple-700"
              style={{ 
                fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                lineHeight: '1.6'
              }}
            >
              {currentDay.arabic}
            </div>

            {/* Bouton audio */}
            <Button
              onClick={() => playAudio(currentDay.audioUrl)}
              variant="outline"
              size="lg"
              className="mb-8"
              disabled={!currentDay.audioUrl}
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Écouter la prononciation
            </Button>

            {/* Options de réponse */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  size="lg"
                  className={`h-16 text-lg ${
                    showResult
                      ? option === currentDay.french
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : option === selectedAnswer
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-300 text-gray-500"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Résultat */}
            {showResult && (
              <div className="mt-6">
                {selectedAnswer === currentDay.french ? (
                  <p className="text-2xl text-green-600 font-bold">
                    ✅ Bravo ! C'est correct !
                  </p>
                ) : (
                  <p className="text-2xl text-red-600 font-bold">
                    ❌ Dommage ! C'était "{currentDay.french}"
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bouton reset */}
      <div className="text-center">
        <Button onClick={resetGame} variant="outline" size="lg">
          <RotateCcw className="w-5 h-5 mr-2" />
          Recommencer
        </Button>
      </div>
    </div>
  );
};

export default QuizTab;