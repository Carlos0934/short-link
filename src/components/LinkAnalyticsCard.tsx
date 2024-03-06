import { Analytics } from "@/lib/types";

type LinkAnalyticsCardProps = {
  label: string;

  element: keyof Analytics;
  analytics: Analytics;
};

export const LinkAnalyticsCard = ({
  label,
  element,
  analytics,
}: LinkAnalyticsCardProps) => {
  return (
    <div className="mt-4">
      <h2 className="font-semibold text-lg text-gray-500">{label}</h2>
      <ul className="mt-2">
        {Object.entries(analytics[element]).map(([element, count]) => (
          <li key={element} className="flex justify-between">
            <span>{element}</span>
            <span>{count || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
