# Aex Designs — Mint App

A custom deployment of the [Mint protocol](https://docs.mint.vv.xyz) by [@afzalaex](https://x.com/afzalaex), showcasing the **e/very days 2026** collection — a 3rd year of daily art practice. Built on top of [`@visualizevalue/mint-app-base`](https://docs.mint.vv.xyz/guide/app/).

🌐 [aex.design](https://aex.design) · 𝕏 [x.com/afzalaex](https://x.com/afzalaex) · Live: [mint.aex.design](https://mint.aex.design)

---

## About This App

This is a [Mint Base App](https://docs.mint.vv.xyz/guide/app/) — a Nuxt 3 application that extends the `@visualizevalue/mint-app-base` layer. The Mint protocol enables artists to deploy gasless, on-chain digital artifact collections on Ethereum. Pricing is based on live network fees, with 50% going to the artist as compensation.

> "To mint is a human right, and your right is your responsibility." — Mint Protocol

---

## Customizations

This app extends the stock Mint base app with the following changes:

### Theme (`assets/theme.css`)
- **Black background** (`#000000`) and **white text** (`#ffffff`) dark mode via CSS variable overrides
- **Space Mono** monospace font (Google Fonts), scaled to 85% of default (`--rem: 13.6px`) to optically balance the wider letterform against the stock layout
- **Muted grey** (`#888888`) for secondary text, author wallet links, and link button states
- **Bold collection title** — the `h1` in the collection intro has `font-weight: 700`
- **Primary buttons** (Connect, Mint) styled with a 100% opacity white `1px` border stroke, transparent background, and a fill-invert effect on hover
- **Link buttons** (Expand/Collapse) retain the stock grey underlined text style with corrected hover and focus state
- **Mint Pricing popover** widened to `650px` with `white-space: nowrap` on table cells to prevent wrapping and reduce vertical height

### Navigation (`components/AppHeader.vue`)
- Overrides the base `AppHeader.vue` to hardcode **"Aex Designs"** as the root breadcrumb label, replacing the default `NUXT_PUBLIC_TITLE` binding which was resolving incorrectly
- All other header logic (gas indicator, connect button, address breadcrumbs) remains 100% stock

### Icons (`components/Icon.vue`)
- Overrides the base `Icon.vue` to strip colorful OS emojis from all UI elements
- Retains only functional close icons: `✕` for `close` and `times`
- `twitter` maps to the `𝕏` double-struck character
- `website` renders as an inline white SVG wireframe globe (bypasses colorful OS emoji rendering)
- All other icons return empty strings (hidden)

### Profile (`components/Profile/Header.client.vue`)
- Overrides the base profile header to hardcode social links for the artist
- Renders two primary action buttons: **🌐 Aex.Design** and **𝕏 x.com/afzalaex**
- Falls back to ENS name or short wallet address for display name, consistent with stock

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) |
| Base Layer | [`@visualizevalue/mint-app-base`](https://docs.mint.vv.xyz/guide/app/) |
| Blockchain | Ethereum Mainnet |
| Wallet | WalletConnect via [wagmi](https://wagmi.sh) |
| Font | [Space Mono](https://fonts.google.com/specimen/Space+Mono) |
| Deployment | [Vercel](https://vercel.com) |

---

## Environment Variables

Configuration follows the [Mint configuration spec](https://docs.mint.vv.xyz/guide/app/configuration). Set these in a `.env` file:

```env
# Required: Your WalletConnect project ID
# Get one at https://cloud.walletconnect.com
NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Optional: Override Nitro preset for non-Vercel deployments
NITRO_PRESET=node-server
```

> The app falls back to a public WalletConnect project ID if none is set, but you should use your own for production.

All other configuration (creator address, collection address, RPC endpoints, indexer) is hardcoded in `nuxt.config.ts` since this is a single-artist deployment.

---

## Local Development

Requires Node >= 20.19.0 and `npm`.

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## How Extending the Base App Works

This app uses the [Extend Base App](https://docs.mint.vv.xyz/guide/app/extend) pattern from the Mint docs. The `nuxt.config.ts` lists the base package in the `extends` array:

```ts
extends: ['@visualizevalue/mint-app-base']
```

Any file in this repo at the same path as a base app file will automatically take priority (Nuxt layer resolution). This is how `AppHeader.vue`, `Icon.vue`, and `Profile/Header.client.vue` override their base counterparts without forking the entire codebase.

All pages, composables, layouts, and API routes from the base app are inherited automatically.

---

## Deployment

This app is deployed on [Vercel](https://vercel.com). The `NITRO_PRESET` is automatically set to `vercel` when the `VERCEL` environment variable is detected.

To deploy your own fork:
1. Fork this repo
2. Connect it to Vercel
3. Set `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in Vercel environment variables
4. Update `nuxt.config.ts` with your own `creatorAddress` and `collectionAddress`

---

## Collection

| | |
|---|---|
| **Artist** | Afzal (`afzalaex.eth`) |
| **Creator Address** | `0x237047f8b97ab581974acaec36e6abba793a29b1` |
| **Collection Address** | `0x0f3f91d3dee2d6172a3c496b392ebeaa26318842` |
| **Indexer** | `https://indexer.networked.art` |
| **Platform** | [aex.design/every-days](https://aex.design/every-days) |

---

## License

MIT — built on the Mint protocol. [Mint Terms and Conditions](https://docs.mint.vv.xyz/terms-and-conditions) apply.
