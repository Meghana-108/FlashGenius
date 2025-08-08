"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({ question, answer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group perspective-1000 h-64 w-full cursor-pointer"
      onClick={handleFlip}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard: ${isFlipped ? 'Answer' : 'Question'}. Click to flip.`}
    >
      <div
        className={cn(
          "relative h-full w-full transform-style-3d transition-transform duration-700",
          { "rotate-y-180": isFlipped }
        )}
      >
        {/* Front of the card (Question) */}
        <Card className="absolute flex h-full w-full flex-col justify-between backface-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Question
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-xl font-medium text-foreground">{question}</p>
          </CardContent>
          <div className="flex items-center justify-end p-4 text-sm text-muted-foreground">
            <RefreshCw className="mr-2 h-4 w-4" />
            Click to flip
          </div>
        </Card>

        {/* Back of the card (Answer) */}
        <Card className="absolute flex h-full w-full flex-col justify-between backface-hidden rotate-y-180">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-accent">
              Answer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-lg text-foreground">{answer}</p>
          </CardContent>
           <div className="flex items-center justify-end p-4 text-sm text-muted-foreground">
            <RefreshCw className="mr-2 h-4 w-4" />
            Click to flip
          </div>
        </Card>
      </div>
    </div>
  );
}
