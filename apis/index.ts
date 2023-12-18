import axios from 'axios'

export const getGoogleCode = () => {
  const params: { [key: string]: string } = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || "",
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL || "",
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
  };

  const queryString = Object.keys(params)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key]),
    )
    .join("&");

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?${queryString}`;

  window.location.href = authUrl;
};

const APIs = {
  getGoogleCode
}

export default APIs