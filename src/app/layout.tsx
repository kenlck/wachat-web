import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { auth } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Wachat",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
