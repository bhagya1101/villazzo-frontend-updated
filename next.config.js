/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost", "villazzo-backend.herokuapp.com"],
  },
}

module.exports = nextConfig

// module.exports = {
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//             // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
//             config.resolve.fallback = {
//                 fs: false,
//                 net: false,
//                 dns: false,
//                 child_process: false,
//                 tls: false
//             }
//         }
//         nextConfig
//         return config;
//     }
// }

