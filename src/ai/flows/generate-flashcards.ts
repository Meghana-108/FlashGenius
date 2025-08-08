'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating flashcards from a given topic.
 *
 * It includes the following exports:
 * - `generateFlashcards`: An async function to generate flashcards.
 * - `GenerateFlashcardsInput`: The input type for the `generateFlashcards` function.
 * - `GenerateFlashcardsOutput`: The output type for the `generateFlashcards` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate flashcards.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const FlashcardSchema = z.object({
  question: z.string().describe('The question on the flashcard.'),
  answer: z.string().describe('The answer to the question.'),
});

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z.array(FlashcardSchema).describe('An array of flashcards generated for the topic.'),
});
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const generateFlashcardsPrompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `Generate 5 to 10 short question and answer flashcard pairs on the topic: "{{{topic}}}". Format response as JSON array: [{
    "question": "...",
    "answer": "..."
  }, ...].`,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await generateFlashcardsPrompt(input);
    return output!;
  }
);
