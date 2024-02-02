import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/provider/session-provider";
import QueryProvider from "@/components/provider/query-provider";
import { userAction } from "@/actions/user-action";
import localFont from "next/font/local";
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
  title: "신냥이우체국",
  description: "",
  authors: {
    name: "Medici-mansion",
    url: "https://medici-mansion.com",
  },
  applicationName: "신냥이우체국",
  creator: "메디치 맨션",
  icons:
    "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1706877880/p1ojq4jdwkwoksrpeykd.png",
  keywords: [
    "신년",
    "고양이",
    "편지",
    "새해",
    "덕담",
    "새해 카드",
    "우무",
    "체즈",
    "구키",
  ],
  openGraph: {
    type: "website",
    countryName: "korea",
    description:
      "귀여운 고양이 '우무', '체즈', '구키'를 통해 새해 편지를 공유하고 활기찬 한해를 시작해 보세요!",
    emails: "medici-ideas@gmail.com",
    title: "새해를 알리는 2024 신냥이우체국",
    url: "https://catsnewyear.site",
    locale: "ko_KR",
    siteName: "신냥이우체국",
    images: [
      "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1706878495/tv5bhomeesnia17xkfcr.png",
      "https://console.cloudinary.com/pm/c-0c9b184855668301285f40a16fdbad/media-explorer?assetId=36236a7f1edc5cdc556c64ea49414c82",
    ],
  },
  category: "신년 편지 우체국 귀여운고양이 우무 체즈 구키 한해 시작",
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
          content="067dd107b9e2376390a50c6bcf83fb3d7a9972b0"
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
