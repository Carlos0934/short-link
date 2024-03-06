import { Visit } from "@prisma/client";

export type Analytics = {
  countries: {
    [key: string]: number;
  };

  browsers: {
    [key: string]: number;
  };

  devices: {
    [key: string]: number;
  };

  lastsVisits: Visit[];
};
