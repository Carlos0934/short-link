import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import generateUrl from "../utils/generateUrl";

const createShortLink = async (
  { url, userId }: { url: string; userId: string },
  {
    prisma,
  }: {
    prisma: PrismaClient;
  }
) => {
  while (true) {
    try {
      const shortUrl = generateUrl({
        length: 6,
        baseUrl: process.env.BASE_URL!,
      });
      const createdShortUrl = await prisma.shortUrl.create({
        data: {
          longUrl: url,
          shortUrl,
          userId,
        },
      });
      return createdShortUrl;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          continue;
        }
      }
      throw error;
    }
  }
};

export default createShortLink;
