/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"], // Atualizado

  images: {
    domains: ['lh3.googleusercontent.com'],
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
