"use client";

import { api } from "@/trpc/react";
import {
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "../../../components/ui/sidebar";

export function ChatroomList() {
  const { data } = api.message.roomList.useQuery();
  const { setOpen } = useSidebar();

  return (
    <SidebarGroup className="px-0">
      asdfs
      <SidebarGroupContent>
        {data?.map((mail) => (
          <a
            href="#"
            key={mail.waAccountId}
            className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex w-full items-center gap-2">
              <span>{mail.profileName}</span>{" "}
              <span className="ml-auto text-xs">
                {mail.createdAt.toDateString()}
              </span>
            </div>
            {/* <span className="font-medium">{mail.body}</span> */}
            <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
              {mail.body}
            </span>
          </a>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
