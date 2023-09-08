import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  await prisma.starRating.deleteMany({});
  const getUsers = await prisma.user.deleteMany({
    where: {
      age: n,
    },
  });
  return getUsers;
};
