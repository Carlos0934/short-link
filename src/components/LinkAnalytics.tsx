import { Analytics } from "@/lib/types";

import LinkAnalyticsTable from "./LinkAnalyticsTable";

export type LinkAnalyticsProps = {
  visits: Analytics["lastsVisits"];
};

export default function LinkAnalytics({ visits }: LinkAnalyticsProps) {
  return (
    <>
      {visits.length === 0 ? (
        <span className="flex items-center justify-center mt-5 h-48 w-full text-center text-xl mx-auto font-semibold">
          No visits yet 😢
        </span>
      ) : (
        <LinkAnalyticsTable visits={visits} />
      )}
    </>
  );
}
