import { GetUserResponse } from "@/type";
import axios from "axios";
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
export const getGoogleCode = () => {
  const authUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount",
  );

  authUrl.searchParams.set(
    "client_id",
    process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || "",
  );
  authUrl.searchParams.set(
    "redirect_uri",
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || "",
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set(
    "scope",
    "https://www.googleapis.com/auth/userinfo.email",
  );
  authUrl.searchParams.set("access_type", "offline");

  window.location.href = authUrl.toString();
};

export const getUser = async (code: string) => {
  const userResponse = await api.get<GetUserResponse>("/oauth/google/user", {
    params: {
      code,
    },
  });
  return userResponse.data;
};

const APIs = {
  getGoogleCode,
  getUser,
};

export default APIs;
