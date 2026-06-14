import express from 'express';
import type { Request, Response } from 'express';

import { chatController } from './controller/chat.controller';

const router = express.Router();

//simeple route to test server is working

router.get('/', (_req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.send('Hello I am Hello /Api/chat');
});

//Grok ai  chat-bot
router.post('/api/chat', chatController);

export default router;
