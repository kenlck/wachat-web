"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { AppSidebar } from "./appSidebar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [breadcrumbs, setBreadcrumbs] = React.useState<
    Array<{ href: string; label: string }>
  >([]);

  React.useEffect(() => {
    const pathSegments = path
      .split("/")
      .filter(Boolean)
      .map((segment, index, array) => ({
        href:
          segment === "menu"
            ? "/menu/chat"
            : `/${array.slice(0, index + 1).join("/")}`,
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
      }));
    setBreadcrumbs(pathSegments);
  }, [path]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
      open={path.startsWith("/menu/chat") ? undefined : false}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <span> &gt; </span>}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
