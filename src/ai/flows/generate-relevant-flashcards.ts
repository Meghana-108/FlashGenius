// src/ai/flows/generate-relevant-flashcards.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating relevant and detailed flashcards from a given topic using AI.
 *
 * - generateRelevantFlashcards - A function that takes a topic string and returns an array of flashcard objects.
 * - GenerateRelevantFlashcardsInput - The input type for the generateRelevantFlashcards function.
 * - GenerateRelevantFlashcardsOutput - The return type for the generateRelevantFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRelevantFlashcardsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate flashcards.'),
});
export type GenerateRelevantFlashcardsInput = z.infer<typeof GenerateRelevantFlashcardsInputSchema>;

const FlashcardSchema = z.object({
  question: z.string().describe('The question on the flashcard.'),
  answer: z.string().describe('The answer to the question on the flashcard.'),
});

const GenerateRelevantFlashcardsOutputSchema = z.array(FlashcardSchema);
export type GenerateRelevantFlashcardsOutput = z.infer<typeof GenerateRelevantFlashcardsOutputSchema>;

export async function generateRelevantFlashcards(input: GenerateRelevantFlashcardsInput): Promise<GenerateRelevantFlashcardsOutput> {
  return generateRelevantFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRelevantFlashcardsPrompt',
  input: {schema: GenerateRelevantFlashcardsInputSchema},
  output: {schema: GenerateRelevantFlashcardsOutputSchema},
  prompt: `Generate 5 to 10 short question and answer flashcard pairs on the topic: "{{topic}}". Ensure the questions and answers are relevant, detailed, and accurate. Format response as JSON array: [{
        "question": "...",
        "answer": "..."
      }, ...].`,
});

const generateRelevantFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateRelevantFlashcardsFlow',
    inputSchema: GenerateRelevantFlashcardsInputSchema,
    outputSchema: GenerateRelevantFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
