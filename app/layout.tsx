import type { Metadata } from "next";
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
const pretendard = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--font-pretendard",
  preload: true,
  src: [
    {
      path: "fonts/PretendardVariable.woff2",
    },
    {
      path: "fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
  ],
  fallback: [
    "Pretendard",
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "sans-serif",
  ],
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
        pretendard.variable,
        pretendard.className,
        "bg-background",
        // "bg-[#26040D]",
      )}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 , maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          "relative h-[100dvh] font-sans antialiased",
          pretendard.className,
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
