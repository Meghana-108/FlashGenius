"use server";

import { generateRelevantFlashcards } from "@/ai/flows/generate-relevant-flashcards";
import type { GenerateRelevantFlashcardsOutput } from "@/ai/flows/generate-relevant-flashcards";

export async function generateFlashcardsAction(topic: string): Promise<{
  data?: GenerateRelevantFlashcardsOutput;
  error?: string;
}> {
  if (!topic) {
    return { error: "Topic cannot be empty." };
  }

  try {
    const flashcards = await generateRelevantFlashcards({ topic });
    if (!flashcards || flashcards.length === 0) {
      return { error: "Could not generate flashcards for this topic. Please try another one." };
    }
    return { data: flashcards };
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
