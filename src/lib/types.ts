import { Visit } from "@prisma/client";

export type Analytics = {
  totalUniqueVisits: number;
  totalClicks: number;

  lastsVisits: Visit[];
};
