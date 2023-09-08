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
  if (result && result.starRatings.length > 0) {
    const totalScore = result.starRatings.reduce(
      (sum, score) => sum + score.score,
      0
    );
    const averageScore = totalScore / result.starRatings.length;
    return averageScore;
  } else {
    return 0;
  }
};
