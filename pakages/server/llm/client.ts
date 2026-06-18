import { Groq } from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
      const response = await client.chat.completions.create({
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
};
