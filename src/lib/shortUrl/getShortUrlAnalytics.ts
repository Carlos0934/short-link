import { PrismaClient } from "@prisma/client";
import { Analytics } from "../types";

async function getShortUrlAnalytics(id: string): Promise<Analytics> {
  const prisma = new PrismaClient();

  const visitsByCountry = (
    await prisma.visit.groupBy({
      by: ["country"],
      where: {
        shortUrlId: id,
      },

      _count: true,
    })
  ).reduce((acc, visit) => {
    return {
      ...acc,
      [visit.country]: visit._count,
    };
  }, {});

  const visitsByBrowser = (
    await prisma.visit.groupBy({
      by: ["browser"],
      where: {
        shortUrlId: id,
      },
      _count: true,
    })
  ).reduce((acc, visit) => {
    return {
      ...acc,
      [visit.browser]: visit._count,
    };
  }, {});

  const visitsByDevice = (
    await prisma.visit.groupBy({
      by: ["device"],
      where: {
        shortUrlId: id,
      },
      _count: true,
    })
  ).reduce((acc, visit) => {
    return {
      ...acc,
      [visit.device]: visit._count,
    };
  }, {});

  const lastVisits = await prisma.visit.findMany({
    where: {
      shortUrlId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const analytics: Analytics = {
    countries: visitsByCountry,
    browsers: visitsByBrowser,
    devices: visitsByDevice,
    lastsVisits: lastVisits,
  };

  console.log(analytics);

  return analytics;
}

export default getShortUrlAnalytics;
