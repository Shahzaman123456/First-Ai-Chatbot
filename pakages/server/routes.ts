import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controller/chat.controller';
import { reviewController } from './controller/review.controller';

const router = express.Router();

//simeple route to test server is working

router.get('/', (_req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

router.delete(
   '/api/products/:productId/reviews/:reviewId',
   reviewController.deleteReview
);

//Grok ai  chat-bot
router.post('/api/chat', chatController);

export default router;
