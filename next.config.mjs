/** @type {import('next').NextConfig} */

// GitHub Pages: set BASE_PATH to your repo name (e.g. /challenger-quiz-ui) when deploying.
// Leave empty for local dev or custom domain.
const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
