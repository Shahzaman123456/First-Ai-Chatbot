import type { Request, Response } from 'express';
import z from 'zod';
import { chat } from '../services/chat.services';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

export async function chatController(
   req: Request,
   res: Response
): Promise<void> {
   const parseResult = chatSchema.safeParse(req.body);

   if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.flatten() });
      return;
   }

   const { prompt, conversationId } = parseResult.data;

   try {
      const result = await chat(conversationId, prompt);
      res.json(result);
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate response.' });
   }
}
