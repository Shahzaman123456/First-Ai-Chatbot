import dayjs from 'dayjs';
import type { Review } from '../generated/prisma/client';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
   host: process.env.DB_HOST!,
   port: Number(process.env.DB_PORT),
   user: process.env.DB_USER!,
   password: process.env.DB_PASSWORD!,
   database: process.env.DB_NAME!,
   allowPublicKeyRetrieval: true,
});
const prisma = new PrismaClient({ adapter });

export const reviewRepositories = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },
   //
   storeSummaryReview(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();
      const data = {
         content: summary,
         expiresAt,
         generatedAt: now,
         productId,
      };

      return prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },
   //
   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [
               { productId },
               { expiresAt: { gt: new Date() } }, //where expsireAt >curetnDayTime
            ],
         },
      });
      return summary ? summary.content : null;
   },
   //
   async deleteReview(reviewId: number) {
      return prisma.review.delete({
         where: { id: reviewId },
      });
   },
   //
   async deleteSummary(productId: number) {
      return prisma.summary.deleteMany({
         where: { productId },
      });
   },
};
