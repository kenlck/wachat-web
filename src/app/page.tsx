import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import { Login } from "./_components/login";

export default async function Home() {
  const session = await auth();
  if (session) {
    return redirect("/menu/chat");
  }
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <Login />
      </main>
    </HydrateClient>
  );
}
