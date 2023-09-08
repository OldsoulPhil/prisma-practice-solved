import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      starRatings: true,
    },
  });

  const starRatings = result.starRatings;

  if (starRatings.length === 0) {
    return 0;
  }

  const totalScore = starRatings.reduce((sum, rating) => sum + rating.score, 0);
  const averageScore = totalScore / starRatings.length;

  return averageScore;
};
