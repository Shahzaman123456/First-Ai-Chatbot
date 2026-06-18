import { reviewRepositories } from '../repositories/review.respositories';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

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

      const prompt = template.replace('{{reviews}}', joinReviews);
      const { text: summary } = await llmClient.generateText({
         model: 'llama-3.3-70b-versatile',
         prompt,
         temperature: 0.7,
         maxTokens: 500,
      });

      await reviewRepositories.storeSummaryReview(productId, summary);
      return summary;
   },
};
