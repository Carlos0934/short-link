import trackShortUrlVisit from "@/lib/shortUrl/trackShortUrlVisit";
import { PrismaClient } from "@prisma/client";

export const GET = (req: Request) => {
  const prisma = new PrismaClient();
  return trackShortUrlVisit(req, { prisma });
};
