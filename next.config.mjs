/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev', // Existing Clerk domain
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com', // Add this Clerk domain
      },
    ],
  },
};
