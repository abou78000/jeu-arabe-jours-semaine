import React, { useState } from "react";
import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import LessonTab from "./components/LessonTab";
import QuizTab from "./components/QuizTab";
import MemoryTab from "./components/MemoryTab";
import AssociationTab from "./components/AssociationTab";
import { BookOpen, Brain, Gamepad2, Link } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌟 أيام الأسبوع بالعربية 🌟
          </h1>
          <p className="text-lg text-gray-600">
            Apprends les jours de la semaine en arabe de façon amusante !
          </p>
        </div>

        {/* Main Content */}
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="lesson" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="lesson" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Leçon
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger value="memory" className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Mémoire
                </TabsTrigger>
                <TabsTrigger value="association" className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Association
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lesson">
                <LessonTab />
              </TabsContent>

              <TabsContent value="quiz">
                <QuizTab />
              </TabsContent>

              <TabsContent value="memory">
                <MemoryTab />
              </TabsContent>

              <TabsContent value="association">
                <AssociationTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;