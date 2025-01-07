import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  File,
  Inbox,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function IconSidebar() {
  const user = {
    name: "Alfred Tim",
    email: "alfred_tim@gmail.com",
    avatar: "https://cdn-icons-png.flaticon.com/256/3135/3135768.png",
  };

  return (
    <div className="flex flex-col justify-between p-4">
      <div className="flex flex-col gap-4">
        <Link href="/menu/chat">
          <Inbox className="size-5" />
        </Link>
        <File className="size-5" />
        <Link href="/menu/settings">
          <Settings className="size-5" />
        </Link>
      </div>
      {/* <picture>
        <img
          src="https://cdn-icons-png.flaticon.com/256/3135/3135768.png"
          alt="Logo"
          className="size-7 rounded-full border border-sidebar-border"
        />
      </picture> */}
      <div className="-ml-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              {/* <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div> */}
              {/* <ChevronsUpDown className="ml-auto size-4" /> */}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"right"}
            // side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
