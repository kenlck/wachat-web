export function UsersContent() {
  return (
    <div className="py-2">
      <main className="flex w-full flex-col">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </div>
      </main>
    </div>
  );
}
