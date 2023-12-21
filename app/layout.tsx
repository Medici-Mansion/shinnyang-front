import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { cookies } from "next/headers";
import { Session } from "@/type";
import { getMe } from "@/apis";

import { SessionProvider } from "@/components/provider/session-provider";
import QueryProvider from "@/components/provider/query-provider";

import localFont from "next/font/local";

const umu = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--font-umu",
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
  const cookie = cookies();
  const access = cookie.get("access");
  const refresh = cookie.get("refresh");
  let session: Session = {
    token: {
      access: access?.value,
      refresh: refresh?.value,
    },
    user: null,
  };
  try {
    if (access?.value) {
      const user = await getMe(access.value);
      session.user = user;
    }
  } catch (error) {
    // console.error(error);
    session.token = null;
  }

  return (
    <html
      lang="ko"
      className={cn(umu.variable, cheezu.variable, gookie.variable)}
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
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
