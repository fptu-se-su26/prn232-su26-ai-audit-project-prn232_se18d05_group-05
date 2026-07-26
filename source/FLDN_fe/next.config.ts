import type { NextConfig } from "next";

/**
 * API host phía sau proxy. Hosting hiện tại (MonsterASP FreeSite) chưa bật được HTTPS,
 * nên trình duyệt sẽ chặn mixed content nếu gọi thẳng từ trang https trên Vercel.
 * Rewrites cho Next.js gọi hộ từ phía server — nơi không áp dụng luật mixed content —
 * đồng thời mọi request thành cùng origin nên không còn vướng CORS.
 *
 * Khi API có HTTPS: đổi API_ORIGIN sang https, hoặc bỏ hẳn rewrites và
 * đặt NEXT_PUBLIC_API_BASE_URL=https://fldn.runasp.net để gọi trực tiếp.
 */
const API_ORIGIN = process.env.API_PROXY_ORIGIN ?? "http://fldn.runasp.net";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
