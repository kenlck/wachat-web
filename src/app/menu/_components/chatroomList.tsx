"use client";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
} from "../../../components/ui/sidebar";

export function ChatroomList() {
  const { data } = api.message.roomList.useQuery();
  const params = useParams();
  const currentRoomId = params.id as string | undefined;
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        {data?.map((mail) => (
          <Link
            href={`/menu/chat/${mail.phoneNumberId}`}
            key={mail.phoneNumberId}
            className={cn(
              "flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              currentRoomId === mail.phoneNumberId
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "",
            )}
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
          </Link>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
