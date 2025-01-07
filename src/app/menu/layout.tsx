import { SidebarLayout } from "./_components/sidebarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
