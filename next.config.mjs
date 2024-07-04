/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  resolve: {
    alias: {
      'react-pdf': 'react-pdf/dist/esm/entry.webpack'
    }
  }
};

export default nextConfig;
