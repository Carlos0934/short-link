import { PrismaClient } from "@prisma/client";

const findShortUrls = async (
  { userId }: { userId: string },
  { prisma }: { prisma: PrismaClient }
) => {
  const shortUrls = await prisma.shortUrl.findMany({
    where: {
      userId,
    },
  });

  return shortUrls;
};

export default findShortUrls;
