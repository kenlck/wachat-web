import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/appSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mt-2 px-4">
        <div className="-ml-1">
          <SidebarTrigger />
        </div>
        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}
