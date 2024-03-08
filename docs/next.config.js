// const withNextra = require('nextra')({
//   theme: 'nextra-theme-docs',
//   themeConfig: './src/theme.config.jsx',
//   defaultShowCopyCode: true,
// })

const withNextra = require('nextra')

// import withNextra from 'nextra'
 
const nextConfig = withNextra({
  
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx',
  defaultShowCopyCode: true,
})({
  basePath: "/docs",
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/docs/introduction',
        permanent: false,
        basePath: false
      },
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: false,
        basePath: false
      },
      {
        source: '/docs/feedback/:path',
        destination: 'https://www.joinaipay.com/dashboard/feedback',
        permanent: false,
        basePath: false
      },
    ]
  },
})


module.exports = nextConfig
