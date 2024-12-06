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
        hostname: 'img.clerk.com', // Existing Clerk domain
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com', // Add Gravatar domain
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Add example.com domain
      },
    ],
  },
};
