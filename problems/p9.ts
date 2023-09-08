import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
  const updateTheName = await prisma.user.updateMany({
    where: { id: userId },
    data: { username: newUsername },
  });
  return updateTheName;
};
