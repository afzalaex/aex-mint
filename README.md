# AEX Mint App

Custom Mint app for the `e/very days 2026` contract on Ethereum.

The app is a Nuxt 3 application that extends `@visualizevalue/mint-app-base` and is configured for:

- creator: `0x237047f8b97ab581974acaec36e6abba793a29b1`
- collection: `0x0f3f91d3dee2d6172a3c496b392ebeaa26318842`
- target subdomain: `mint.aex.design`

## Stack

- Nuxt 3
- `@visualizevalue/mint-app-base`
- Mainnet Mint factory
- Mint indexer: `https://indexer.networked.art`

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the app:

```bash
pnpm dev
```

## Build Commands

Build for production:

```bash
pnpm build
```

Generate a static build:

```bash
pnpm generate
```

Preview locally:

```bash
pnpm preview
```

## Optional Environment Variables

See [`.env.example`](./.env.example).

You only need extra env vars if you want to:

- change RPC endpoints
- add WalletConnect
- override the deploy preset

## Vercel Deployment

This project is set up to deploy cleanly as a separate Vercel project for `mint.aex.design`.

Suggested flow:

```bash
vercel link --project <project-name>
vercel --prod
```

Then attach the custom domain in Vercel:

```bash
vercel domains add mint.aex.design <project-name>
vercel domains inspect mint.aex.design
```

If `aex.design` DNS is managed outside Vercel, add the CNAME target shown by the second command at your DNS provider.
