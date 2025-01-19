"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Login</h1>
      <div className="flex flex-col gap-2">
        <Input label="Username" />
        <Input label="Password" type="password" />
        <Button
          className="mt-2"
          onClick={() => {
            router.push("/menu/chat");
          }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
