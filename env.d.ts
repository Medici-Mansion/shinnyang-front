declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: string;
    readonly NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: string;
    readonly NEXT_PUBLIC_GOOGLE_REDIRECT_URL: string;
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_KAKAO_REDIRECT_URL: string;
    readonly NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
    readonly NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID: string;
    readonly NEXT_PUBLIC_KAKAO_JS_KEY: string;
  }
}
