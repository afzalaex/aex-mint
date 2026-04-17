import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [
    '@visualizevalue/mint-app-base',
  ],

  alias: {
    '@base': '@visualizevalue/mint-app-base',
  },

  css: [
    '@base/assets/styles/index.css',
    '~/assets/theme.css',
  ],

  runtimeConfig: {
    public: {
      title: 'Aex Designs',
      description: '3rd year of daily art practice by Afzal, learn more: aex.design/every-days',
      creatorAddress: '0x237047f8b97ab581974acaec36e6abba793a29b1',
      collectionAddress: '0x0f3f91d3dee2d6172a3c496b392ebeaa26318842',
      defaultAvatar: '/icon.svg',
      platformUrl: 'https://aex.design/every-days',
      indexerEndpoints: 'https://indexer.networked.art',
      links: [
        {
          label: 'Aex.Design',
          url: 'https://aex.design',
          icon: 'website'
        },
        {
          label: 'x.com/afzalaex',
          url: 'https://x.com/afzalaex',
          icon: 'twitter'
        }
      ],
      walletConnectProjectId: process.env.NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'bc436338b71debaeb1dfbb0dd5daddcf',
      mainnetRpc1: 'https://eth.llamarpc.com',
      rpc1: 'https://eth.llamarpc.com',
      rpc2: 'https://ethereum-rpc.publicnode.com',
      rpc3: 'https://eth.drpc.org',
    },
  },

  app: {
    head: {
      title: 'Aex Designs',
      htmlAttrs: {
        class: 'dark',
      },
      meta: [
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
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    preset: process.env.NITRO_PRESET || (process.env.VERCEL ? 'vercel' : 'node-server'),
  },

  devtools: {
    enabled: true,
  },
})
