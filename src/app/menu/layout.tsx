import { IconSidebar } from "./_components/iconSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row">
      <IconSidebar />
      <div className="h-screen w-full overflow-y-auto pr-4 pt-4">{children}</div>
    </div>
  );
}
