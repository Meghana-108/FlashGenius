"use client";

import * as React from "react";
import { z } from "zod";
import { generateFlashcardsAction } from "@/app/actions";
import type { GenerateRelevantFlashcardsOutput } from "@/ai/flows/generate-relevant-flashcards";
import { FlashcardForm } from "@/components/flashcard-form";
import { FlashcardGrid } from "@/components/flashcard-grid";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Lightbulb, Loader2 } from "lucide-react";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
});

export default function Home() {
  const [flashcards, setFlashcards] =
    React.useState<GenerateRelevantFlashcardsOutput>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [topic, setTopic] = React.useState<string>("");

  const handleGenerate = async (formData: FormData) => {
    const topicValue = formData.get("topic") as string;
    const validation = formSchema.safeParse({ topic: topicValue });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    setError(null);
    setTopic(topicValue);
    if (flashcards.length > 0) {
      setFlashcards([]);
    }

    const result = await generateFlashcardsAction(topicValue);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setFlashcards(result.data);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* 🌀 Fullscreen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
      )}

      <SiteHeader />
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <section className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Learn Anything Faster
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Enter any topic, and let AI create a set of custom flashcards to
            supercharge your study sessions.
          </p>
        </section>

        <section className="mx-auto max-w-xl">
          <FlashcardForm
            onGenerate={handleGenerate}
            loading={loading}
            hasGenerated={flashcards.length > 0}
          />
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </section>

        <section className="mt-12">
          {/* 💡 Flashcard Skeleton Placeholder */}
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-lg bg-muted shadow"
                ></div>
              ))}
            </div>
          ) : flashcards.length > 0 ? (
            <FlashcardGrid
              flashcards={flashcards}
              loading={loading}
              topic={topic}
            />
          ) : (
            !error && (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-12 text-center">
                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  Your flashcards will appear here
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Enter a topic above to get started. Try &quot;The Roman Empire&quot; or
                  &quot;Quantum Physics&quot;.
                </p>
              </div>
            )
          )}
        </section>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>Built with Next.js and AI. Powered by FlashGenius.</p>
      </footer>
    </div>
  );
}
