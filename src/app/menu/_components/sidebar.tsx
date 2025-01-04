"use client";

import { cn } from "@/lib/utils";
import { Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAVIGATION = [
  { icon: Home, name: "Dashboard", href: "/menu/dashboard" },
  { icon: Users, name: "Users", href: "/menu/users" },
  { icon: Settings, name: "Settings", href: "/menu/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 bg-white px-6 dark:bg-slate-900 lg:px-0">
      <h1 className="mt-2 text-lg font-medium">MyApp Name Here</h1>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="space-y-1">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      item.href === pathname
                        ? "bg-gray-100 dark:bg-slate-700"
                        : "hover:bg-gray-100 dark:hover:bg-slate-700",
                      "block rounded-md leading-6 text-gray-700 dark:text-gray-300",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
