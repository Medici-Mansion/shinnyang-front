import { Session } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { serviceName } }: { params: { serviceName: string } },
) {
  const { searchParams, origin } = new URL(req.url);

  const response = NextResponse.redirect(origin);
  try {
    const code = searchParams.get("code");
    const scope = searchParams.get("scope");

    if (code) {
      const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
      apiUrl.pathname = `/oauth/${serviceName}/user`;
      apiUrl.searchParams.set("code", code);
      apiUrl.searchParams.set("scope", scope || "");
      const fetcher = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = (await fetcher.json()) as Session["token"];
      if (fetcher.status >= 400) {
        throw new Error("invalid request - " + JSON.stringify(token));
      }
      response.cookies.set({
        name: "access",
        value: token?.access || "",
        httpOnly: true,
        // 하루 - 24시간
        maxAge: 60 * 60 * 24,
      });
      response.cookies.set({
        name: "refresh",
        value: token?.refresh || "",
        httpOnly: true,
        // 30일
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  } catch (error: any) {
    console.error(`[AUTH ERROR]: ${error?.message}`);
  }

  return response;
}
