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
  variable: "--font-umu",
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
  variable: "--font-cheezu",
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
  variable: "--font-gookie",
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

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:title" content="신냥이우체국" />
        <meta
          property="og:description"
          content="2024 신년편지 신냥이우체국에서 답장 보내시겠어요?"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/banner.png" />
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
