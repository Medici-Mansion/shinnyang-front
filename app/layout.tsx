import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryProvider from "@/components/provider/query-provider";
import { cookies } from "next/headers";
import { getMe } from "@/apis";
import { Session } from "@/type";
import { SessionProvider } from "@/components/provider/session-provider";

const fontSans = Roboto({
  weight: ["300", "400", "500", "700"],
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
  if (access?.value) {
    const user = await getMe(access.value);
    session.user = user;
  }

  return (
    <html lang="ko" suppressHydrationWarning>
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
