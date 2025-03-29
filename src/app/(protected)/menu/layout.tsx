import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { SidebarLayout } from "./_components/sidebarLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  return <SidebarLayout>{children}</SidebarLayout>;
}
