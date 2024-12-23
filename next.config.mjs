/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "nwtdicgwbtncdg8c.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
  outputFileTracing: true,
};

export default nextConfig;
