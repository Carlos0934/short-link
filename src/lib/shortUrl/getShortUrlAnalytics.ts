import { PrismaClient, Visit } from "@prisma/client";
import { Analytics } from "../types";

type CountResult = {
  count: number;
}[];
async function getShortUrlAnalytics(
  id: string,
  { prisma }: { prisma: PrismaClient }
): Promise<Analytics> {
  const [totalUniqueVisits, totalClicks, lastsVisits] = await Promise.all([
    prisma.$queryRaw<CountResult>`SELECT COUNT(DISTINCT ipAddress) count FROM Visit WHERE shortUrlId = ${id}`,
    prisma.$queryRaw<CountResult>`SELECT COUNT(*) count FROM Visit WHERE shortUrlId = ${id}`,
    prisma.$queryRaw<
      Visit[]
    >`SELECT * FROM Visit WHERE shortUrlId = ${id} ORDER BY "createdAt" DESC LIMIT 10`,
  ]);

  const analytics: Analytics = {
    totalUniqueVisits: Number(totalUniqueVisits[0].count),
    totalClicks: Number(totalClicks[0].count),
    lastsVisits: lastsVisits,
  };

  return analytics;
}

export default getShortUrlAnalytics;
