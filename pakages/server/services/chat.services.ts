import fs from 'fs';
import path from 'path';
import conversationRepository from '../repositories/conversation.repositories';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

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

   const response = await llmClient.generateText({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: instruction }, ...history],
      temperature: 0.7,
   });

   const message = response;
   history.push({ role: 'assistant', content: message.text });

   return {
      id: conversationId,
      message: message.text,
   };
}
