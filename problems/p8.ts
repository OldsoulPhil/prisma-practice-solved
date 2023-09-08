import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const minStarRating = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });

  const grumpiestCritic = minBy(minStarRating, (rating) => rating._avg.score);
  const grumpiestCriticId = grumpiestCritic?.userId;

  return grumpiestCriticId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const maxStarRating = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });
  const nicestCritic = maxBy(maxStarRating, (rating) => rating._avg.score);
  const nicestCriticId = nicestCritic?.userId;

  return nicestCriticId;
};
