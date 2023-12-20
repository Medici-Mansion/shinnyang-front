import { ServiceProviders } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { serviceName } }: { params: { serviceName: string } },
) {
  const { searchParams, origin } = new URL(req.url);
  try {
    ServiceProviders.parse(serviceName);

    const callbackUrl =
      searchParams.get("callbackUrl") ||
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;

    const authUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount",
    );

    authUrl.searchParams.set(
      "client_id",
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    );
    authUrl.searchParams.set("redirect_uri", callbackUrl);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set(
      "scope",
      "https://www.googleapis.com/auth/userinfo.email",
    );

    return NextResponse.redirect(authUrl.toString());
  } catch (err) {
    const originWithErrorQuery = new URL(origin);
    originWithErrorQuery.searchParams.set("er_cd", "P-0");
    return NextResponse.redirect(originWithErrorQuery);
  }
}
