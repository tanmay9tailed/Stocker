/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-1441974231531-c6227db76b6e',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      }
    ],
  },
};

export default nextConfig;
