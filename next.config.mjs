/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
      bodyParser: {
        sizeLimit: "50mb",
      },
    },
    experimental: {
      serverActions: {
        bodySizeLimit: "100mb",
      },
    },
  };

export default nextConfig;
