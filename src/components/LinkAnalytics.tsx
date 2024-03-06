import { Analytics } from "@/lib/types";
import { LinkAnalyticsCard } from "./LinkAnalyticsCard";

import LinkAnalyticsTable from "./LinkAnalyticsTable";

export type LinkAnalyticsProps = {
  analytics: Analytics;
};

export default function LinkAnalytics({ analytics }: LinkAnalyticsProps) {
  return (
    <>
      {Object.keys(analytics.countries).length === 0 ? (
        <span className="flex items-center justify-center mt-5 h-48 w-full text-center text-xl mx-auto font-semibold">
          No visits yet 😢
        </span>
      ) : (
        <>
          <div className="grid grid-cols-3">
            <LinkAnalyticsCard
              label="Countries"
              element="countries"
              analytics={analytics}
            />
            <LinkAnalyticsCard
              label="Browsers"
              element="browsers"
              analytics={analytics}
            />
            <LinkAnalyticsCard
              label="Devices"
              element="devices"
              analytics={analytics}
            />
          </div>
          <LinkAnalyticsTable visits={analytics.lastsVisits} />
        </>
      )}
    </>
  );
}
