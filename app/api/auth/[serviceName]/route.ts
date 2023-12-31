import { ServiceProviders } from "@/constants";
import { Session } from "@/type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function GET(
  req: NextRequest,
  { params: { serviceName } }: { params: { serviceName: string } },
) {
  const redirectUrl = new URL(req.url);

  try {
    const code = redirectUrl.searchParams.get("code");
    const response = NextResponse.redirect(redirectUrl.origin);
    const scope = redirectUrl.searchParams.get("scope");

    const validateServiceName = ServiceProviders.parse(serviceName);
    if (!code) {
      // TODO: 에러 핸들링 커스텀 클래스 제작 필요
      throw new Error("서비스가 원할하지 않습니다.", {
        cause: "code is empty.",
      });
    }
    const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL);

    apiUrl.pathname = `/oauth/${validateServiceName}/user`;
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

    return response;
  } catch (error: any) {
    const originWithErrorQuery = new URL(redirectUrl.origin);
    const errorCodes = [];
    console.log(error, "<<error.constuctor");
    switch (error.constuctor) {
      case z.ZodError:
        errorCodes.push("P-1");
      default:
        errorCodes.push("C-1");
        console.error(`[AUTH ERROR]: ${error?.message}`);
        originWithErrorQuery.searchParams.set("er_cd", errorCodes.join(","));
        break;
    }

    return NextResponse.redirect(originWithErrorQuery);
  }
}
