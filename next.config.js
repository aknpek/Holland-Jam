/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['picsum.photos'], // Allow images from picsum.photos
    },
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    experimental: {
      serverActions: true,
    },
  }
  
  module.exports = nextConfig
  
  