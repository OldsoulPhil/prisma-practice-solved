import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const stars = await prisma.starRating.findMany({
    include: {
      movie: true,
    },
  });

  const groups = groupBy(stars, (star) => star.movieId);
  const entries = Object.entries(groups);
  const moviesWithAverageScoreOverN = reduce(
    entries,
    (acc, [key, starRatings]) => {
      const averageScore =
        sumBy(stars, (star) => star.score) / starRatings.length;
      if (averageScore > n) {
        return [...acc, starRatings[0].movieId];
      }
      return acc;
    },
    [] as number[]
  );
  return moviesWithAverageScoreOverN;
};
