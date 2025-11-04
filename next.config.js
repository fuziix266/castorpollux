/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images from Supabase storage and Google (Facebook scraped URLs)
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}

module.exports = nextConfig;