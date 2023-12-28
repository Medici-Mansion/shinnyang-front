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
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled:
    process.env.NODE_ENV === "production" && process.env.ANALYZE === "true", // 환경변수 ANALYZE가 true일 때 실행
  openAnalyzer: false, // 브라우저에 자동으로 분석결과를 새 탭으로 Open하는 것을 방지
});

export default withPlaiceHolder(nextConfig);
