import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Login } from "./_components/login";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-screen flex-col items-center justify-center">
        <Login />
      </main>
    </HydrateClient>
  );
}
