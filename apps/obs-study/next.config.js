//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const customCache = require('./cache')
const { withNx } = require('@nrwl/next/plugins/with-nx')

const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: customCache,
})

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = withPWA({
  async rewrites() {
    return [
      {
        source: '/jpg/:slug*',
        destination: 'https://cdn.door43.org/obs/jpg/:slug*',
      },
    ]
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
})

module.exports = withNx(nextConfig)
