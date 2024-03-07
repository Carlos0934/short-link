import { DashboardProviders } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold  mt-4">Dashboard</h1>
      <DashboardProviders>{children}</DashboardProviders>
    </div>
  );
}
