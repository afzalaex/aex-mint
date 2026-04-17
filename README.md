# Aex Designs - Digital Artifacts

A minimalist frontend for the [Mint Protocol](https://docs.mint.vv.xyz/), configured as a persistent gallery and minting terminal for digital artifacts. 

This application extends the `@visualizevalue/mint-app-base` layer to provide a streamlined experience for creators and collectors, mirroring the "Human Right to Mint" philosophy.

## Principles

- **Sovereign Creation**: Direct interaction with the Mint factory and indexer.
- **Minimal Brutalism**: A high-contrast, performance-focused interface designed to prioritize the artifact over the interface.
- **Permissionless**: No proprietary backends; all data is derived from the EVM and decentralized indexers.

## Tech Stack

- **Framework**: Nuxt 3 (Vue.js)
- **Base Layer**: `@visualizevalue/mint-app-base`
- **Protocol**: Mint (EVM)
- **Styling**: Vanilla CSS (Minimal Brutalist)

## Setup

### 1. Install Dependencies

Ensure you have `pnpm` installed:

```bash
pnpm install
```

### 2. Configuration

Copy the example environment file and adjust for your local configuration:

```bash
cp .env.example .env
```

Key configuration variables (available in `nuxt.config.ts` or `.env`):

- `NUXT_PUBLIC_TITLE`: The branding displayed in the navigation.
- `NUXT_PUBLIC_CREATOR_ADDRESS`: The Ethereum address of the creator.
- `NUXT_PUBLIC_COLLECTION_ADDRESS`: The default collection address to display.

### 3. Development

Run the development server with Hot Module Replacement (HMR):

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Deployment

This application is designed to be deployed on **Vercel** or any Node.js-compatible host. 

For Vercel:
1. Connect this repository to your Vercel account.
2. Set the `NITRO_PRESET=vercel` environment variable.
3. Deploy.

---

Released under the MIT License. Built on the [Mint Protocol](https://docs.mint.vv.xyz/).
