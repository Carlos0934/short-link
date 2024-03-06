import { PrismaClient, ShortUrl } from "@prisma/client";

function getShortLinkByShortUrl(
  shortUrl: string,
  options: { prisma: PrismaClient }
): Promise<ShortUrl | null> {
  return options.prisma.shortUrl.findFirst({
    where: {
      shortUrl,
    },
  });
}

export default getShortLinkByShortUrl;
