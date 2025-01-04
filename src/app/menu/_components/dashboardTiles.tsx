export function DashboardTiles({
  title,
  amount,
  description,
  Icon,
}: {
  title: string;
  amount: string;
  description: string;
  Icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium tracking-tight">{title}</h3>
        <Icon className="h-4 w-4" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
