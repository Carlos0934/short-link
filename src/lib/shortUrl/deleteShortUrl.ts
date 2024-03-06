import { PrismaClient } from "@prisma/client";

async function deleteShortUrl(
  shortUrlId: string,
  { prisma }: { prisma: PrismaClient }
) {
  await prisma.$transaction([
    prisma.shortUrl.delete({
      where: {
        id: shortUrlId,
      },
    }),
    prisma.visit.deleteMany({
      where: {
        shortUrlId,
      },
    }),
  ]);
}

export default deleteShortUrl;
