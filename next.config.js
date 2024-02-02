/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

module.exports = nextConfig;
