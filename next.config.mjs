/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: "100mb",
      },
    },
  };

export default nextConfig;

module.exports = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Cambia el valor según lo que necesites
    },
  },
};
