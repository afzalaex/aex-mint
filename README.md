# Aex Designs — Mint App

A custom deployment of the [Mint protocol](https://docs.mint.vv.xyz) by [Aex Designs](https://aex.design), built on top of [`@visualizevalue/mint-app-base`](https://docs.mint.vv.xyz/guide/app/).

🌐 [aex.design](https://aex.design) · 𝕏 [x.com/afzalaex](https://x.com/afzalaex) · Live: [mint.aex.design](https://mint.aex.design)

---

## About

This app serves as the minting interface for all collections by Aex Designs on the Ethereum network. It is powered by the [Mint protocol](https://docs.mint.vv.xyz) — an open internet protocol for creating and collecting on-chain digital artifacts.

Mint prices each artifact based on real-time Ethereum network fees, with 50% of the fee going directly to the artist. There are no artificial scarcity limits — scarcity is enforced through the moment of creation.

> "To mint is a human right, and your right is your responsibility." — Mint Protocol

---

## Customizations

This app extends the stock `@visualizevalue/mint-app-base` using the [Nuxt layer extension pattern](https://docs.mint.vv.xyz/guide/app/extend). Only the files listed below are overridden — everything else (pages, routing, composables, wallet logic) is inherited from the base layer.

### Theme (`assets/theme.css`)
- Pure black (`#000000`) background and white (`#ffffff`) text via CSS variable overrides
- [Space Mono](https://fonts.google.com/specimen/Space+Mono) monospace font, scaled to 85% of the base `--rem` (13.6px) to optically balance the wider letterform against the stock layout proportions
- Muted grey (`#888888`) for all secondary text, author wallet links, and inactive link states
- Bold `font-weight: 700` on collection title `h1`
- Primary action buttons (Connect, Mint) use a solid white `1px` stroke with a fill-invert hover effect
- Link-style buttons (Expand/Collapse) retain stock underlined grey text with corrected focus/hover state
- Gas pricing popover widened to `650px` with `white-space: nowrap` on table cells to prevent wrapping

### Navigation (`components/AppHeader.vue`)
- Overrides only the root breadcrumb label to display a hardcoded brand name instead of the default `NUXT_PUBLIC_TITLE` config binding
- All other header behaviour (gas indicator, wallet connect, address breadcrumbs, layout) is 100% stock

### Icons (`components/Icon.vue`)
- Overrides the base icon set to remove colorful OS emojis from all UI elements
- Only functional icons are retained: `✕` for close/dismiss actions
- `twitter` type maps to `𝕏`, `website` type renders as an inline white SVG wireframe globe
- All other icon slots return empty (hidden)

### Artist Profile (`components/Profile/Header.client.vue`)
- Overrides the base profile header to inject hardcoded social action links
- Renders two primary buttons on the artist profile page: website and social links
- Display name, avatar, and address copy logic remain stock

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Nuxt 3](https://nuxt.com) |
| Base Layer | [`@visualizevalue/mint-app-base`](https://docs.mint.vv.xyz/guide/app/) |
| Blockchain | Ethereum Mainnet |
| Wallet | WalletConnect + injected wallets via [wagmi](https://wagmi.sh) |
| Font | [Space Mono](https://fonts.google.com/specimen/Space+Mono) |
| Deployment | [Vercel](https://vercel.com) |

---

## Configuration

Configuration follows the [Mint spec](https://docs.mint.vv.xyz/guide/app/configuration). Set these in a `.env` file at the project root:

```env
# Your WalletConnect project ID — get one at https://cloud.walletconnect.com
NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Optional: override the Nitro server preset for non-Vercel deployments
NITRO_PRESET=node-server
```

All other settings (creator address, collection address, RPC endpoints, indexer URL) are configured directly in `nuxt.config.ts` as this is a single-artist scoped deployment.

---

## Local Development

**Requires Node >= 20.19.0**

```bash
# Install dependencies
npm install

# Start local dev server at http://localhost:3000
npm run dev
```

---

## How the Extend Pattern Works

Nuxt layer resolution means any local file at the same path as a base layer file automatically takes priority. For example:

```
components/AppHeader.vue        ← overrides @visualizevalue/mint-app-base/components/AppHeader.vue
components/Icon.vue             ← overrides base icons
components/Profile/Header.client.vue  ← overrides base profile header
assets/theme.css                ← loaded after base styles, overrides via CSS variables
```

No forking of the base package is required. All pages, middleware, composables, and server logic are inherited automatically. See [Extend Base App](https://docs.mint.vv.xyz/guide/app/extend) in the Mint docs.

---

## Deploying Your Own Fork

To deploy this as your own Mint app:

1. Fork this repository
2. Update `nuxt.config.ts`:
   - `creatorAddress` — your Ethereum wallet address
   - `collectionAddress` — your collection contract address
   - `title`, `description`, `platformUrl` — your branding
3. Update `components/Profile/Header.client.vue` with your own social links
4. Connect the repo to [Vercel](https://vercel.com)
5. Set `NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` in Vercel environment variables

---

## License

MIT — built on the Mint protocol. [Mint Terms and Conditions](https://docs.mint.vv.xyz/terms-and-conditions) apply.
