import { PrismaClient } from "@prisma/client";

async function trackShortUrlVisit(
  req: Request,
  { prisma }: { prisma: PrismaClient }
) {
  const result = await prisma.shortUrl.findUnique({
    select: { longUrl: true },
    where: { shortUrl: req.url },
  });

  if (!result) {
    return Response.redirect("/404");
  }

  const lol = [...req.headers.entries()];
  console.log(lol);
  return Response.redirect(result.longUrl, 302);
}

export default trackShortUrlVisit;
