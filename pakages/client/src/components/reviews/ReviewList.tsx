import axios from 'axios';
import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '#components/ui/button';
import { HiMiniSparkles } from 'react-icons/hi2';

import ReviewSkeleton from './ReviewSkeleton';
import { reviewsApi } from './reviewsApi';
import type { SummarizeResponse, GetReviewsResponse } from './reviewsApi';

type Props = {
   productId: number;
};

const ReviewList = ({ productId }: Props) => {
   const summaryMuation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsApi.summarizeReviews(productId),
   });

   const reviewQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsApi.fetchReviews(productId),
   });

   if (reviewQuery.isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (reviewQuery.isError) {
      return <p className="text-red-500">Could not fetch reviews.Try again!</p>;
   }
   if (!reviewQuery.data || reviewQuery.data.reviews.length === 0) {
      return null;
   }
   const currentSummary =
      reviewQuery.data.summary || summaryMuation.data?.summary;
   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => summaryMuation.mutate()}
                     className="cursor-pointer"
                     disabled={summaryMuation.isPending}
                  >
                     <HiMiniSparkles />
                     Summarize
                  </Button>
                  {summaryMuation.isPending && (
                     <div className="py-3">
                        {' '}
                        <ReviewSkeleton />{' '}
                     </div>
                  )}
                  {summaryMuation.isError && (
                     <p className="text-red-500">
                        Could not summarize reviews. Try again!
                     </p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5 ">
            {reviewQuery.data?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <div>
                     {' '}
                     <StarRating value={review.rating} />
                  </div>
                  <p className="p-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
