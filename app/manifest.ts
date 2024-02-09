import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "새해복설냥",
    short_name: "새해복설냥",
    description:
      "설날 연휴 새해복을 전달하는 귀여운 설냥이와 함께 특별한 행복을 선물해보세냥 ฅ•ω•ฅ",
    start_url: "/",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
