/** @type {import('next').NextConfig} */
const nextConfig = {
    // Explicitly set turbopack.root to this package so Next can infer the
    // correct workspace root when there are multiple lockfiles in the repo.
    turbopack: {
        root: './',
    },
    images: {
        // `images.domains` is deprecated — use `remotePatterns` instead.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.microlink.io', // Microlink Image Preview
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
