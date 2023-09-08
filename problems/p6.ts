import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      starRatings: {
        include: {
          movie: true,
        },
      },
    },
  });
  const movies = user?.starRatings.map((rating) => rating.movie);
  return movies;
};
