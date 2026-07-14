const title = process.env.NUXT_PUBLIC_TITLE || 'Aex Designs'
const description = process.env.NUXT_PUBLIC_DESCRIPTION || '3rd year of daily art practice by Afzal, learn more: aex.design/every-days'
const creatorAddress = process.env.NUXT_PUBLIC_CREATOR_ADDRESS || '0x237047f8b97ab581974acaec36e6abba793a29b1'
const defaultAvatar = process.env.NUXT_PUBLIC_DEFAULT_AVATAR || '/icon.svg'
const platformUrl = process.env.NUXT_PUBLIC_PLATFORM_URL || 'https://aex.design/every-days'
const indexerEndpoints = process.env.NUXT_PUBLIC_INDEXER_ENDPOINTS || 'https://indexer.networked.art'
const domain = process.env.NUXT_PUBLIC_DOMAIN || 'mint.aex.design'
// Match mint.networked.art order: healthy public RPCs first. eth.llamarpc.com is currently dead (HTTP 521).
const mainnetRpc1 = process.env.NUXT_PUBLIC_MAINNET_RPC1 || 'https://ethereum-rpc.publicnode.com'
const rpc1 = process.env.NUXT_PUBLIC_RPC1 || 'https://ethereum-rpc.publicnode.com'
const rpc2 = process.env.NUXT_PUBLIC_RPC2 || 'https://eth.drpc.org'
const rpc3 = process.env.NUXT_PUBLIC_RPC3 || 'https://1rpc.io/eth'
const walletConnectProjectId = process.env.NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '0559d9a7757dd065c823c785f0c650f2'

// Artist-scoped Mint apps are recommended as SPA (see docs.mint.vv.xyz extend guide).
// Default off unless explicitly enabled — avoids Vercel serverless cold starts on every page view.
const ssr = process.env.NUXT_SSR === 'true'

export default defineNuxtConfig({
  extends: [
    '@visualizevalue/mint-app-base',
  ],

  ssr,

  alias: {
    '@base': '@visualizevalue/mint-app-base',
  },

  css: [
    '@base/assets/styles/index.css',
    '~/assets/theme.css',
  ],

  runtimeConfig: {
    public: {
      title,
      description,
      creatorAddress,
      defaultAvatar,
      platformUrl,
      indexerEndpoints,
      domain,
      links: [
        {
          label: 'aex.design',
          url: 'https://aex.design',
          icon: 'website',
        },
        {
          label: 'x.com/afzalaex',
          url: 'https://x.com/afzalaex',
          icon: 'twitter',
        },
      ],
      walletConnectProjectId,
      mainnetRpc1,
      rpc1,
      rpc2,
      rpc3,
    },
  },

  app: {
    head: {
      title,
      htmlAttrs: {
        class: 'dark',
      },
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          name: 'theme-color',
          content: '#000000',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/icon.svg',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    // Static SPA is the recommended deploy path for artist-scoped Mint apps.
    // Override with NITRO_PRESET=vercel (and NUXT_SSR=true) only if you need SSR.
    preset: process.env.NITRO_PRESET || (process.env.VERCEL ? 'static' : 'node-server'),
  },

  hooks: {
    'app:resolve': (app) => {
      app.plugins = app.plugins.filter(
        plugin => !String(plugin.src).includes('@visualizevalue/mint-app-base/plugins/2.wagmi'),
      )
    },
  },

  devtools: {
    enabled: process.env.NUXT_DEVTOOLS === 'true',
  },
})
