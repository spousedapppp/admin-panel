/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "getspoused.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "getspoused.s3.ap-southeast-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
