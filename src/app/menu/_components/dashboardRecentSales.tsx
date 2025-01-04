"use client";

import { RecentSalesTiles } from "./recentSalesTiles";

export function DashboardRecentSales() {
  return (
    <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
      <p className="font-semibold">Recent Sales</p>
      <p className="text-sm text-gray-500">You made 265 sales this month</p>
      <div className="mt-4 flex flex-col gap-2">
        <RecentSalesTiles
          image="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_female_icon_192701.png"
          name="Olivia Martin"
          email="olivia.martin@email.com"
          amount="$1,999.00"
        />
        <RecentSalesTiles
          image="https://cdn.icon-icons.com/icons2/3150/PNG/512/user_profile_male_icon_192702.png"
          name="Jackson Lee"
          email="jackson.lee@email.com"
          amount="$39.00"
        />
      </div>
    </div>
  );
}
