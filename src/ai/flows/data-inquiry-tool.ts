'use server';
/**
 * @fileOverview A data inquiry AI agent.
 *
 * - dataInquiry - A function that handles the data inquiry process.
 * - DataInquiryInput - The input type for the dataInquiry function.
 * - DataInquiryOutput - The return type for the dataInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataInquiryInputSchema = z.object({
  query: z.string().describe('The user\'s query about the data.'),
});
export type DataInquiryInput = z.infer<typeof DataInquiryInputSchema>;

const DataInquiryOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user query.'),
});
export type DataInquiryOutput = z.infer<typeof DataInquiryOutputSchema>;

export async function dataInquiry(
  input: DataInquiryInput
): Promise<DataInquiryOutput> {
  return dataInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dataInquiryPrompt',
  input: {schema: DataInquiryInputSchema},
  output: {schema: DataInquiryOutputSchema},
  prompt: `You are an expert data analyst. The user will ask you a question about their data, and you will answer it.

Query: {{{query}}}`,
});

const dataInquiryFlow = ai.defineFlow(
  {
    name: 'dataInquiryFlow',
    inputSchema: DataInquiryInputSchema,
    outputSchema: DataInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
