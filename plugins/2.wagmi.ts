import { VueQueryPlugin } from '@tanstack/vue-query'
import {
  http,
  cookieStorage,
  createConfig,
  createStorage,
  WagmiPlugin,
  fallback,
  type Config,
  type CreateConnectorFn,
} from '@wagmi/vue'
import { mainnet, sepolia, holesky, localhost } from '@wagmi/vue/chains'
import { coinbaseWallet, injected, metaMask, walletConnect } from '@wagmi/vue/connectors'
import type { CustomTransport, Transport } from 'viem'

// Fail over quickly when a public RPC is down instead of hanging the UI.
const RPC_TIMEOUT_MS = 4_000
const RPC_RETRY_COUNT = 1

function rpcTransport (url: string) {
  return http(url, {
    timeout: RPC_TIMEOUT_MS,
    retryCount: RPC_RETRY_COUNT,
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const title = nuxtApp.$config.public.title || 'Mint'
  const description = nuxtApp.$config.public.description || 'Mint app'
  const mainChainId = nuxtApp.$config.public.chainId
  const configuredDomain = (nuxtApp.$config.public.domain as string | undefined) || 'mint.aex.design'
  const appUrl = import.meta.client
    ? window.location.origin
    : `https://${configuredDomain}`
  const iconUrl = new URL(`${nuxtApp.$config.app.baseURL}icon.svg`, `${appUrl}/`).toString()

  const connectors: CreateConnectorFn[] = [
    injected(),
    injected({ target: 'rainbow' }),
    coinbaseWallet({
      appName: title,
      appLogoUrl: iconUrl,
    }),
    metaMask({
      dappMetadata: {
        name: title,
        iconUrl,
        url: appUrl,
      },
    }),
  ]

  if (nuxtApp.$config.public.walletConnectProjectId)
    connectors.push(
      walletConnect({
        projectId: nuxtApp.$config.public.walletConnectProjectId,
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'dark',
        },
        metadata: {
          name: title,
          description,
          url: appUrl,
          icons: [iconUrl],
        },
      }),
    )

  const transportDefinitions: CustomTransport | Transport[] = []

  if (nuxtApp.$config.public.rpc1)
    transportDefinitions.push(rpcTransport(nuxtApp.$config.public.rpc1 as string))
  if (nuxtApp.$config.public.rpc2)
    transportDefinitions.push(rpcTransport(nuxtApp.$config.public.rpc2 as string))
  if (nuxtApp.$config.public.rpc3)
    transportDefinitions.push(rpcTransport(nuxtApp.$config.public.rpc3 as string))
  // Last-resort public mainnet endpoint from viem chain defaults
  transportDefinitions.push(http(undefined, { timeout: RPC_TIMEOUT_MS, retryCount: RPC_RETRY_COUNT }))

  const transports = fallback(transportDefinitions, {
    rank: false,
  })

  const wagmiConfig: Config = createConfig({
    chains: [mainnet, sepolia, holesky, localhost],
    batch: {
      multicall: true,
    },
    connectors,
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]:
        mainChainId == 1
          ? transports
          : rpcTransport(nuxtApp.$config.public.mainnetRpc1 as string),
      [sepolia.id]: transports,
      [holesky.id]: transports,
      [localhost.id]: transports,
    },
  })

  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiConfig }).use(VueQueryPlugin, {})

  return {
    provide: {
      wagmi: wagmiConfig,
    },
  }
})
