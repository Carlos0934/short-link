import { PrismaClient } from "@prisma/client";

async function deleteShortUrl(
  shortUrlId: string,
  { prisma }: { prisma: PrismaClient }
) {
  await prisma.visit.deleteMany({ where: { shortUrlId } });
  await prisma.shortUrl.delete({ where: { id: shortUrlId } });
}

export default deleteShortUrl;
