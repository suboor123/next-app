/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['firebasestorage.googleapis.com', 'suboorkhan.com', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
