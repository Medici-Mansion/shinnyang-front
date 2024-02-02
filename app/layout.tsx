import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/provider/session-provider";
import QueryProvider from "@/components/provider/query-provider";
import { userAction } from "@/actions/user-action";
import localFont from "next/font/local";
import { defaultMetadata } from "./metadata";
const umu = localFont({
  adjustFontFallback: "Arial",
  variable: "--var-font-umu",
  preload: true,

  src: [
    {
      path: "fonts/UhBeeJJIBBABBA.woff",
      weight: "normal",
    },
  ],
});
const cheezu = localFont({
  adjustFontFallback: "Arial",
  variable: "--var-font-cheezu",
  preload: true,
  src: [
    {
      path: "fonts/UhBeecharming.woff",
      weight: "normal",
    },
  ],
});
const gookie = localFont({
  adjustFontFallback: "Arial",
  variable: "--var-font-gookie",
  preload: true,
  src: [
    {
      path: "fonts/UhBeenamsoyoung.woff",
      weight: "normal",
    },
  ],
});
const pretendard = localFont({
  adjustFontFallback: "Arial",
  display: "swap",
  variable: "--var-font-pretendard",
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
  ...defaultMetadata,
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
        umu.className,
        cheezu.variable,
        cheezu.className,
        gookie.variable,
        gookie.className,
        pretendard.variable,
        pretendard.className,
        "bg-background",
        // "bg-[#26040D]",
      )}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111111" />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          defer
        />
        <meta name="msapplication-TileColor" content="#111111" />
        <meta name="theme-color" content="#111111" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 , maximum-scale=1.0, user-scalable=no"
        />

        <meta property="og:image" content="/og/banner.png" />
        <meta
          name="naver-site-verification"
          content="740aa45f79210f9f4181fbbde2c09af1dbc0ea83"
        />
      </head>
      <body
        className={cn(
          "relative font-sans antialiased",
          pretendard.className,
          umu.className,
          cheezu.className,
          gookie.className,
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
