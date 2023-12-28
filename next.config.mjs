import withPlaiceHolder from "@plaiceholder/next";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";
import withImages from "next-images";
/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  experimental: {
    gzipSize: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  swcMinify: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled:
    process.env.NODE_ENV === "production" && process.env.ANALYZE === "true", // 환경변수 ANALYZE가 true일 때 실행
  openAnalyzer: false, // 브라우저에 자동으로 분석결과를 새 탭으로 Open하는 것을 방지
});

export default withPlaiceHolder(nextConfig);
