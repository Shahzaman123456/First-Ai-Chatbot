import { Ollama } from 'ollama';
import { Groq } from 'groq-sdk';
import { InferenceClient } from '@huggingface/inference';
import summarizePrompt from '../llm/prompts/summarize-reviews.txt';

const grokAIClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const indernceClient = new InferenceClient(process.env.HF_TOKEN);

const ollamaClient = new Ollama();

type Message = {
   role: 'user' | 'assistant' | 'system';
   content: string;
};

type GenerateTextOption = {
   model?: string;
   prompt?: string;
   messages?: Message[];
   maxTokens?: number;
   temperature?: number;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'llama-3.3-70b-versatile',
      prompt,
      messages,
      maxTokens = 300,
      temperature = 0.2,
   }: GenerateTextOption): Promise<GenerateTextResult> {
      const finalMessages: Message[] = messages ?? [
         { role: 'user', content: prompt! },
      ];
      const response = await grokAIClient.chat.completions.create({
         model,
         messages: finalMessages,
         temperature,
         max_tokens: maxTokens,
      });
      return {
         id: response.id,
         text: response.choices[0]?.message?.content ?? '',
      };
   },

   async summarizeReviews(reviews: string) {
      const response = await ollamaClient.chat({
         model: 'tinyllama',
         messages: [
            {
               role: 'system',
               content: summarizePrompt,
            },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });

      return response.message.content;
   },
};
