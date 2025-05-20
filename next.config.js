const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-west-2.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 's3-sa-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
    ],
  },
};

export default nextConfig;
