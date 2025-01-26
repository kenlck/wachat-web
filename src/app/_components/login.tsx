"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (searchParams.get("error") === "CredentialsSignin") {
      setError("Invalid username or password");
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Login</h1>
      <div className="flex flex-col gap-2">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

        <Button
          className="mt-2"
          onClick={async () => {
            setError(null);
            await signIn("credentials", {
              email: formData.email,
              password: formData.password,
              callbackUrl: "/menu/chat",
            });
          }}
        >
          Log In
        </Button>
      </div>
    </div>
  );
}
