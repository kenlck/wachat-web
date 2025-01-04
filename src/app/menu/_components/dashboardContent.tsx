import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { DashboardChart } from "./dashboardChart";
import { DashboardRecentSales } from "./dashboardRecentSales";
import { DashboardTiles } from "./dashboardTiles";

export function DashboardContent() {
  const data = [
    {
      title: "Total Revenue",
      amount: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      title: "Subsciptions",
      amount: "+2350",
      description: "+180.1% from last month",
      icon: Users,
    },
    {
      title: "Sales",
      amount: "+12,234",
      description: "+19% from last month",
      icon: CreditCard,
    },
    {
      title: "Active Now",
      amount: "+573",
      description: "+201 since last hour",
      icon: Activity,
    },
  ];

  return (
    <div className="py-2">
      <main className="flex w-full flex-col">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((tile) => (
              <DashboardTiles
                key={tile.title}
                title={tile.title}
                amount={tile.amount}
                description={tile.description}
                Icon={tile.icon}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DashboardChart />
            <DashboardRecentSales />
          </div>
        </div>
      </main>
    </div>
  );
}
