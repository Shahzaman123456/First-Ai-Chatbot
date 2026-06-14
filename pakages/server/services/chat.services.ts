import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';
import conversationRepository from '../repositories/conversation.repositories';
import template from '../prompts/chatbot.txt';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instruction = template.replace('{parkInfo}', parkInfo);

type ChatResponse = {
   id: string;
   message: string;
};

export async function chat(
   conversationId: string,
   prompt: string
): Promise<ChatResponse> {
   const history = conversationRepository.get(conversationId);
   history.push({ role: 'user', content: prompt });

   const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
         { role: 'system', content: instruction }, // ✅ system prompt here
         ...history,
      ],
      temperature: 0.7,
   });

   const message = response.choices[0]!.message.content!;
   history.push({ role: 'assistant', content: message });

   return {
      id: conversationId,
      message,
   };
}
