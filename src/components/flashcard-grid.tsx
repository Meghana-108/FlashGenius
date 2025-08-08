import type { GenerateRelevantFlashcardsOutput } from "@/ai/flows/generate-relevant-flashcards";
import { Flashcard } from "@/components/flashcard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
interface FlashcardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  flashcards: GenerateRelevantFlashcardsOutput;
  loading: boolean;
  topic: string;
}

const FlashcardSkeleton = () => (
  <Card className="flex h-64 flex-col justify-between p-6">
    <Skeleton className="h-6 w-3/4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </Card>
);

export function FlashcardGrid({
  flashcards,
  loading,
  topic,
  ...props
}: FlashcardGridProps) {
  // Add a useEffect hook that depends on the topic prop.
  // Inside the hook, map over the flashcards and set isFlipped to false.
  useEffect(() => {
    flashcards.forEach((card) => (card.isFlipped = false));
  }, [topic]);

  if (loading) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <FlashcardSkeleton key={i} />
            ))}
        </div>
    );
  }
  
  if (flashcards.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="mb-6 font-headline text-3xl font-bold tracking-tight">
        Flashcards for: <span className="text-primary">{topic}</span>
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flashcards.map((card, index) => (
 <Flashcard key={`${topic}-${index}`} question={card.question} answer={card.answer} />
        ))}
      </div>
    </>
  );
}
