import { PrismaClient, Visit } from "@prisma/client";

async function trackShortUrlVisit(
  {
    shortUrl: shortUrlString,
    ...data
  }: Partial<Omit<Visit, "id" | "createdAt" | "shortUrlId">> & {
    shortUrl: string;
  },
  { prisma }: { prisma: PrismaClient }
) {
  const shortUrl = await prisma.shortUrl.findUnique({
    select: { longUrl: true, id: true },
    where: { shortUrl: shortUrlString },
  });

  if (!shortUrl) {
    return null;
  }

  await prisma.visit.create({
    data: {
      device: data.device || "unknown",
      browser: data.browser || "unknown",
      country: data.country || "unknown",
      ipAddress: data.ipAddress || "unknown",
      shortUrlId: shortUrl.id,
    },
  });

  return shortUrl.longUrl;
}

export default trackShortUrlVisit;
