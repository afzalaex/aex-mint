const env = (key: string, fallback = '') => (process.env[key] ?? fallback).trim()

const title = env('NUXT_PUBLIC_TITLE', 'Aex Designs')
const description = env('NUXT_PUBLIC_DESCRIPTION', '3rd year of daily art practice by Afzal, learn more: aex.design/every-days')
const creatorAddress = env('NUXT_PUBLIC_CREATOR_ADDRESS', '0x237047f8b97ab581974acaec36e6abba793a29b1')
const defaultAvatar = env('NUXT_PUBLIC_DEFAULT_AVATAR', '/icon.svg')
const platformUrl = env('NUXT_PUBLIC_PLATFORM_URL', 'https://aex.design/every-days')
const indexerEndpoints = env('NUXT_PUBLIC_INDEXER_ENDPOINTS', 'https://indexer.networked.art')
const domain = env('NUXT_PUBLIC_DOMAIN', 'mint.aex.design')
// Match mint.networked.art order: healthy public RPCs first. eth.llamarpc.com is currently dead (HTTP 521).
const mainnetRpc1 = env('NUXT_PUBLIC_MAINNET_RPC1', 'https://ethereum-rpc.publicnode.com')
const rpc1 = env('NUXT_PUBLIC_RPC1', 'https://ethereum-rpc.publicnode.com')
const rpc2 = env('NUXT_PUBLIC_RPC2', 'https://eth.drpc.org')
const rpc3 = env('NUXT_PUBLIC_RPC3', 'https://1rpc.io/eth')
const walletConnectProjectId = env('NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID', '0559d9a7757dd065c823c785f0c650f2')
// Same private IPFS gateway the main Mint host uses (faster than public ipfs.io).
const ipfsGateway = env('NUXT_PUBLIC_IPFS_GATEWAY', 'https://ipfs.vv.xyz/ipfs/')

// Match mint.networked.art: SSR for a real first paint. Pure SPA feels blank/crashy while multi-MB JS loads.
const ssr = env('NUXT_SSR', 'true') !== 'false'

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
      ipfsGateway,
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
    // Server render like mint.networked.art (not blank static SPA shell).
    preset: env('NITRO_PRESET') || (process.env.VERCEL ? 'vercel' : 'node-server'),
  },

  hooks: {
    'app:resolve': (app) => {
      app.plugins = app.plugins.filter(
        plugin => !String(plugin.src).includes('@visualizevalue/mint-app-base/plugins/2.wagmi'),
      )
    },
  },

  devtools: {
    enabled: env('NUXT_DEVTOOLS') === 'true',
  },
})
