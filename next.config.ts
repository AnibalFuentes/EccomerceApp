import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

// next.config.js
module.exports = {
  eslint: {
    // Deshabilita ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
}


export default nextConfig;
