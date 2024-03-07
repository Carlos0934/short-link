import trackShortUrlVisit from "@/lib/shortUrl/trackShortUrlVisit";
import { PrismaClient } from "@prisma/client";
import { userAgent } from "next/server";

export const GET = async (req: Request) => {
  const prisma = new PrismaClient();
  const { browser, device } = userAgent(req);
  const country =
    req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country");
  const ipAddress =
    req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  const url = req.url;

  try {
    const longUrl = await trackShortUrlVisit(
      {
        browser: browser.name,
        device: device.type,
        country: country || undefined,
        ipAddress: ipAddress || undefined,
        shortUrl: url,
      },
      { prisma }
    );

    if (!longUrl) {
      return Response.redirect("/404", 302);
    }

    return Response.redirect(longUrl, 302);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
