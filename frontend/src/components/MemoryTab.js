import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RotateCcw, Trophy } from "lucide-react";
import { daysData } from "../data/daysData";

const MemoryTab = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState({ pairs: 0, errors: 0 });
  const [gameComplete, setGameComplete] = useState(false);

  // Initialiser les cartes
  const initializeCards = () => {
    const arabicCards = daysData.map((day, index) => ({
      id: `arabic-${index}`,
      type: 'arabic',
      content: day.arabic,
      pairId: day.id,
      isFlipped: false,
      isMatched: false
    }));

    const frenchCards = daysData.map((day, index) => ({
      id: `french-${index}`,
      type: 'french', 
      content: day.french,
      pairId: day.id,
      isFlipped: false,
      isMatched: false
    }));

    const allCards = [...arabicCards, ...frenchCards]
      .sort(() => Math.random() - 0.5);

    setCards(allCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore({ pairs: 0, errors: 0 });
    setGameComplete(false);
  };

  // Retourner une carte
  const flipCard = (cardId) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    // Vérifier les paires après 2 cartes retournées
    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 1000);
    }
  };

  // Vérifier les correspondances
  const checkMatch = (flippedCardIds) => {
    const [card1Id, card2Id] = flippedCardIds;
    const card1 = cards.find(c => c.id === card1Id);
    const card2 = cards.find(c => c.id === card2Id);

    if (card1.pairId === card2.pairId && card1.type !== card2.type) {
      // Paire trouvée !
      setCards(prev => prev.map(c => 
        flippedCardIds.includes(c.id) 
          ? { ...c, isMatched: true }
          : c
      ));
      
      setMatchedPairs(prev => [...prev, card1.pairId]);
      setScore(prev => ({ ...prev, pairs: prev.pairs + 1 }));

      // Vérifier si le jeu est terminé
      if (matchedPairs.length + 1 === daysData.length) {
        setGameComplete(true);
      }
    } else {
      // Pas de correspondance
      setCards(prev => prev.map(c => 
        flippedCardIds.includes(c.id) 
          ? { ...c, isFlipped: false }
          : c
      ));
      
      setScore(prev => ({ ...prev, errors: prev.errors + 1 }));
    }

    setFlippedCards([]);
  };

  // Initialiser le jeu au montage
  useEffect(() => {
    initializeCards();
  }, []);

  return (
    <div className="space-y-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-green-600">
          🎯 Jeu de mémoire
        </CardTitle>
        <p className="text-gray-600">
          Trouve les paires jour arabe / jour français
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✅ Paires: {score.pairs}/7
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600">
            ❌ Erreurs: {score.errors}
          </Badge>
        </div>
      </CardHeader>

      {gameComplete && (
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-300">
          <CardContent className="p-6 text-center">
            <Trophy className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              🎉 Bravo ! 🎉
            </h3>
            <p className="text-green-600">
              Toutes les paires trouvées ! Score : {score.pairs} paires, {score.errors} erreurs
            </p>
          </CardContent>
        </Card>
      )}

      {/* Grille de cartes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-24 cursor-pointer transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? card.type === 'arabic'
                  ? "bg-purple-100 border-purple-300"
                  : "bg-blue-100 border-blue-300"
                : "bg-gray-200 hover:bg-gray-300"
            } ${card.isMatched ? "opacity-75" : ""}`}
            onClick={() => flipCard(card.id)}
          >
            <CardContent className="p-2 h-full flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <div className="text-center">
                  <div 
                    className={`font-bold ${
                      card.type === 'arabic' 
                        ? "text-lg text-purple-700" 
                        : "text-sm text-blue-700"
                    }`}
                    style={card.type === 'arabic' ? { 
                      fontFamily: "'Amiri', 'Noto Naskh Arabic', serif"
                    } : {}}
                  >
                    {card.content}
                  </div>
                </div>
              ) : (
                <div className="text-4xl">
                  🤔
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bouton reset */}
      <div className="text-center">
        <Button onClick={initializeCards} variant="outline" size="lg">
          <RotateCcw className="w-5 h-5 mr-2" />
          Nouvelle partie
        </Button>
      </div>
    </div>
  );
};

export default MemoryTab;