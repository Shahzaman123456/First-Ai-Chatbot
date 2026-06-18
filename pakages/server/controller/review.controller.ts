import type { Request, Response } from 'express';
import { reviewService } from '../services/review.services';
import { prodcutRepository } from '../repositories/product.repositories';
import { reviewRepositories } from '../repositories/review.respositories';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }
      const prodcuct = await prodcutRepository.getProduct(productId);
      if (!prodcuct) {
         res.status(400).json({ error: 'Product not found' });
         return;
      }
      const reviews = await reviewRepositories.getReviews(productId);
      const summary = await reviewRepositories.getReviewSummary(productId);
      res.json({
         summary,
         reviews,
      });
   },
   //
   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }
      //
      // product check add karo
      const product = await prodcutRepository.getProduct(productId);
      if (!product) {
         res.status(404).json({ error: 'Product does not exist' });
         return;
      }

      const reviews = await reviewRepositories.getReviews(productId, 1);
      if (!reviews.length) {
         res.status(400).json({ error: 'No reviews found to summarize' });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
   //
   async deleteReview(req: Request, res: Response) {
      const reviewId = Number(req.params.reviewId);
      const productId = Number(req.params.productId);

      if (isNaN(reviewId) || isNaN(productId)) {
         res.status(400).json({ error: 'Invalid review or product ID' });
         return;
      }

      await reviewService.deleteReview(reviewId, productId);
      res.json({ message: 'Review deleted successfully' });
   },
};
