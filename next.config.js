/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['firebasestorage.googleapis.com', 'suboorkhan.com', 'res.cloudinary.com'],
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat',
    //   });
    // }

    return config;
  },
}

module.exports = nextConfig
