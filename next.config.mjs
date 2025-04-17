/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.cache = false
        return config
      },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'fakestoreapi.com',
            },
          ],
      },
};

export default nextConfig;
