import { reviewRepositories } from '../repositories/review.respositories';
import { llmClient } from '../llm/client';

export const reviewService = {
   //
   async deleteReview(reviewId: number, productId: number) {
      await reviewRepositories.deleteReview(reviewId);
      await reviewRepositories.deleteSummary(productId);
   },
   //   //send reviws to grok ai to summarize
   async summarizeReviews(productId: number): Promise<string> {
      const existingSummary =
         await reviewRepositories.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      const reviews = await reviewRepositories.getReviews(productId, 10);
      const reviewContents = reviews.map((r) => r.content).filter(Boolean);
      const joinReviews = reviewContents.join('\n\n');

      const summary = await llmClient.summarizeReviews(joinReviews);

      await reviewRepositories.storeSummaryReview(productId, summary);
      return summary;
   },
};
