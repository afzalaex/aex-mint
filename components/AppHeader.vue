<template>
  <header class="app-header">
    <ClientOnly>
      <Breadcrumbs :items="breadcrumbs" />

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
const appBreadcumbs = useAppBreadcrumb()
const id = useArtistId()
const store = useOnchainStore()

const breadcrumbs = computed(() => {
  return [
    {
      to: id.value === address.value?.toLowerCase()
        ? { name: 'id', params: { id: id.value } }
        : `/`,
      text: 'Aex Designs'
    },
    ...appBreadcumbs.value,
  ]
})

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

:deep(.breadcrumbs) {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1rem;
}

:deep(.breadcrumbs > span > a) {
  color: #fff;
  text-decoration: none !important;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

:deep(.breadcrumbs > span > a:hover),
:deep(.breadcrumbs > span > a.router-link-active-exact) {
  opacity: 1;
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
  text-transform: none !important;
}

:deep(.header-action:hover), :deep(.header-action button:hover), :deep(.header-action .button:hover) {
  color: #fff !important;
  opacity: 1 !important;
  background: transparent !important;
}
</style>
