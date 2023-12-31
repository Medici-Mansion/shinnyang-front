import * as z from "zod";
export const ServiceProviders = z.enum(["google", "kakao"], {
  invalid_type_error: "지원하지 않는 서비스입니다.",
});
export type ServiceProviderType = z.infer<typeof ServiceProviders>;

export const BROWSER = {
  MAX_WIDTH: 574,
  MAX_HEIGHT: 1080,
};

export const PROVIDER: {
  [key in ServiceProviderType]: {
    redirectUrl: string;
    clientId: string;
  };
} = {
  google: {
    redirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
    clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
  },
  kakao: {
    redirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  },
};

export const dayToKorean = {
  "1": "첫 번째",
  "2": "두 번째",
  "3": "세 번째",
  "4": "네 번째",
  "5": "다섯 번째",
  "6": "여섯 번째",
  "7": "일곱 번째",
  "8": "여덟 번째",
  "9": "아홉 번째",
  "10": "열 번째",
  "11": "열한 번째",
  "12": "열두 번째",
  "13": "열세 번째",
  "14": "열네 번째",
  "15": "열다섯 번째",
  "16": "열여섯 번째",
  "17": "열일곱 번째",
  "18": "열여덟 번째",
  "19": "열아홉 번째",
  "20": "스무 번째",
  "21": "스물한 번째",
  "22": "스물두 번째",
  "23": "스물세 번째",
  "24": "스물네 번째",
  "25": "스물다섯 번째",
  "26": "스물여섯 번째",
  "27": "스물일곱 번째",
};
