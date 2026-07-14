# Aex Designs Mint App

This repo is the branded Mint app for Aex Designs. It follows the Mint guide approach of extending `@visualizevalue/mint-app-base`, then customizing the app with local theme and component overrides:

- Mint guide: https://docs.mint.vv.xyz/guide/
- Base app package: `@visualizevalue/mint-app-base`

The current repo is already configured for the Aex mainnet artist scope and keeps the custom black/white UI, Aex branding, and profile links.

## What Is Customized Here

- Site title and metadata: `Aex Designs`
- Artist scope: `0x237047f8b97ab581974acaec36e6abba793a29b1`
- Platform URL: `https://aex.design/every-days`
- Domain target: `mint.aex.design`
- Mint indexer: `https://indexer.networked.art`
- Local theme overrides in [`assets/theme.css`](./assets/theme.css)
- Local component overrides in [`components/`](./components)

## Requirements

- Node.js `>=20.19.0`
- `pnpm`

## Local Setup

Install dependencies:

```bash
pnpm install
```

Create a local env file from the example:

```bash
cp .env.example .env
```

Start the dev server:

```bash
pnpm dev
```

## Environment Variables

The app works with the defaults in [`.env.example`](./.env.example), but these are the important values to understand:

- `NUXT_PUBLIC_DOMAIN`: used by Mint's subdomain middleware. Keep this aligned with your real deployment domain.
- `NUXT_PUBLIC_TITLE`: the user-facing site name. This repo defaults to `Aex Designs`.
- `NUXT_PUBLIC_CREATOR_ADDRESS`: the artist wallet the app is scoped to.
- `NUXT_PUBLIC_PLATFORM_URL`: where the "learn more" link should point.
- `NUXT_PUBLIC_INDEXER_ENDPOINTS`: the Mint indexer endpoint used for profile and mint data. Critical for fast loads.
- `NUXT_PUBLIC_RPC1`, `NUXT_PUBLIC_RPC2`, `NUXT_PUBLIC_RPC3`: Ethereum RPC fallbacks **in order**. Put working endpoints first (publicnode → drpc → 1rpc). A dead primary RPC makes the whole app feel stuck.
- `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: optional, but required if you want the WalletConnect connector to appear.
- `NUXT_SSR`: keep `true` to match mint.networked.art (SSR first paint). `false` produces a blank SPA shell until multi-MB JS loads.
- `NITRO_PRESET`: `vercel` for SSR on Vercel.
- `NUXT_PUBLIC_IPFS_GATEWAY`: defaults to Mint's gateway `https://ipfs.vv.xyz/ipfs/`.

## WalletConnect Project ID

WalletConnect will not show up unless you provide your own Project ID.

1. Go to the WalletConnect Dashboard: https://dashboard.walletconnect.com/
2. Create a project for this app.
3. Copy the generated Project ID.
4. Add your allowed origins there.
5. Put the value in `.env` as `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=...`

Recommended origins for this repo:

- `http://localhost:3000` for local development
- `https://mint.aex.design` for production

If you deploy to a different host or port, allowlist that exact origin as well.

## Commands

Start development:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Generate a static build:

```bash
pnpm generate
```

Preview the production build:

```bash
pnpm preview
```

## Vercel Deployment

This repo deploys with **SSR** on Vercel for `mint.aex.design`, matching how `mint.networked.art` feels (shell + progressive data load).

```bash
vercel link --project <project-name>
vercel --prod
```

Set these production env vars in the Vercel project (same values as `.env.example`):

- `NUXT_PUBLIC_CREATOR_ADDRESS`
- `NUXT_PUBLIC_INDEXER_ENDPOINTS=https://indexer.networked.art`
- `NUXT_PUBLIC_RPC1=https://ethereum-rpc.publicnode.com`
- `NUXT_PUBLIC_RPC2=https://eth.drpc.org`
- `NUXT_PUBLIC_RPC3=https://1rpc.io/eth`
- `NUXT_PUBLIC_IPFS_GATEWAY=https://ipfs.vv.xyz/ipfs/`
- `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `NUXT_SSR=true` (or remove the var — do **not** leave it as `false`)
- `NITRO_PRESET=vercel` (not `static`)

Then attach and verify the custom domain:

```bash
vercel domains add mint.aex.design <project-name>
vercel domains inspect mint.aex.design
```

If DNS is managed outside Vercel, create the DNS record Vercel asks for in the last command output.

### Common UX issues

1. **Dead primary RPC** (`eth.llamarpc.com`) — app hangs on wallet/gas/chain reads.
2. **`NUXT_SSR=false` static SPA** — blank page until multi-MB JS boots; feels like a crash vs networked.art.
3. **Profile override** — keep the base profile so collected items work like Mint Protocol.
