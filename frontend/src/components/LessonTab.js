import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { daysData, useAudio } from "../data/daysData";

const LessonTab = () => {
  const { playAudio } = useAudio();

  return (
    <div className="space-y-6">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl text-blue-600">
          📚 Apprends les jours de la semaine
        </CardTitle>
        <CardDescription className="text-lg">
          Clique sur le bouton audio pour entendre la prononciation
        </CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysData.map((day) => (
          <Card key={day.id} className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-200">
            <CardContent className="p-6 text-center">
              {/* Jour en arabe avec calligraphie */}
              <div 
                className="text-3xl font-bold mb-3 text-gray-800"
                style={{ 
                  fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                  lineHeight: '1.6'
                }}
              >
                {day.arabic}
              </div>

              {/* Traduction française */}
              <div className="text-xl text-blue-600 font-semibold mb-4">
                {day.french}
              </div>

              {/* Bouton audio */}
              <Button
                onClick={() => playAudio(day.audioUrl)}
                variant={day.audioUrl ? "default" : "secondary"}
                size="lg"
                className={`w-full ${
                  day.audioUrl 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!day.audioUrl}
              >
                {day.audioUrl ? (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Écouter
                  </>
                ) : (
                  <>
                    <VolumeX className="w-5 h-5 mr-2" />
                    Audio bientôt disponible
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-center text-yellow-800">
            💡 <strong>Astuce :</strong> Répète chaque prononciation plusieurs fois pour mieux mémoriser !
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonTab;