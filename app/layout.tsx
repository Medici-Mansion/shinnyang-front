import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/provider/session-provider";
import QueryProvider from "@/components/provider/query-provider";

import localFont from "next/font/local";
import { userAction } from "@/actions/user-action";
const umu = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--font-umu",
  preload: true,
  src: [
    {
      path: "fonts/UhBeepuding.woff",
      weight: "normal",
    },
  ],
});
const cheezu = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--font-cheezu",
  preload: true,
  src: [
    {
      path: "fonts/UhBeeJJIBBABBA.woff",
      weight: "normal",
    },
  ],
});
const gookie = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--font-gookie",
  preload: true,
  src: [
    {
      path: "fonts/UhBeeGENWOO.woff",
      weight: "normal",
    },
  ],
});

const fontSans = Roboto({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "신냥이우체국",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userAction();

  return (
    <html
      lang="ko"
      className={cn(
        umu.variable,
        cheezu.variable,
        gookie.variable,
        "bg-[#26040D] font-cheezu font-gookie font-umu",
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "relative h-[100dvh] bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            {children}
            <ReactQueryDevtools />
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
