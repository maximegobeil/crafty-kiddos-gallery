/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["crafty-kiddos-gallery.s3.us-east-2.amazonaws.com"],
  },
};
