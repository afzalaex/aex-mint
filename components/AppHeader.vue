<template>
  <header class="app-header">
    <ClientOnly>
      <div class="site-title">
        <NuxtLink to="/">Aex Designs</NuxtLink>
      </div>

      <div class="actions">
        <MintGasPricePopover class="header-action" />

        <Connect v-if="!isConnected" class="header-action" />
        <NuxtLink v-else
          :to="{
            name: 'profile-address',
            params: { address: address?.toLowerCase() }
          }"
          class="header-action account"
        >
          <Account :address="address" />
        </NuxtLink>
      </div>
    </ClientOnly>
  </header>
</template>

<script setup>
import { useAccount } from '@wagmi/vue'
const { isConnected, address } = useAccount()
const store = useOnchainStore()
watchEffect(() => {
  if (! isConnected.value) {
    store.clearAllTokenBalances()
  }
})
</script>

<style scoped>
header {
  min-height: 71px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  border-bottom: none !important;
}

.site-title a {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  color: #fff;
  text-decoration: none !important;
  font-size: 1rem;
}

.site-title a:hover {
  opacity: 0.7;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

:deep(.header-action), :deep(.header-action button), :deep(.header-action .button) {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  color: #a0a0a0 !important;
  text-decoration: underline !important;
  text-underline-offset: 4px;
  font-family: 'Space Mono', monospace !important;
  font-size: 1rem !important;
  cursor: pointer;
  box-shadow: none !important;
}

:deep(.header-action:hover), :deep(.header-action button:hover), :deep(.header-action .button:hover) {
  color: #fff !important;
  opacity: 1 !important;
  background: transparent !important;
}
</style>
