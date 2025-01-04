import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar />
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Add your dashboard content here */}
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                  <h3 className="text-sm font-medium tracking-tight">
                    Total Revenue
                  </h3>
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </div>
              </div>
              {/* Add more cards for other metrics */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
