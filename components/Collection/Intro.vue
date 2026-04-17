<template>
  <header class="collection-intro">
    <figure v-if="collection.image">
      <Image :src="collection.image" :alt="collection.name" />
    </figure>

    <div class="text">
      <div>
        <h1 style="font-size: 2rem; margin-bottom: 0.5rem; line-height: 1.2;">
          {{ collection.name || $t('collection.unnamed') }}
          <small v-if="collection.symbol" style="font-size: 1rem;">({{ collection.symbol }})</small>
        </h1>
        <p v-if="collection.description">
          <ExpandableText :text="collection.description" :length="80" />
        </p>
      </div>

      <div class="meta" v-if="id">
        <NuxtLink :to="{ name: 'id', params: { id } }">
          {{ store.displayName(id) }}
        </NuxtLink>
        <span class="meta-item">{{ collection.latestTokenId }} {{ $t('tokens', Number(collection.latestTokenId)) }}</span>
        <span class="meta-item">block {{ collection.initBlock }}</span>
      </div>

      <menu class="links">
        <Button :to="projectUrl" target="_blank">
          <span>Project Site</span>
        </Button>
        <Button :to="mintUrl" target="_blank">
          <span>Original Mint Page</span>
        </Button>
        <Button :to="explorerUrl" target="_blank">
          <span>View Contract</span>
        </Button>
      </menu>

      <CollectionActions :collection="collection" />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Collection } from '@visualizevalue/mint-app-base/types'

const { collection } = defineProps<{
  collection: Collection
}>()

const id = useArtistId()
const store = useOnchainStore()
const config = useRuntimeConfig()

const projectUrl = 'https://aex.design/every-days'
const mintUrl = computed(() => `https://mint.networked.art/${collection.owner}/${collection.address}`)
const explorerUrl = computed(() => `${config.public.blockExplorer}/address/${collection.address}`)
</script>

<style scoped>
header.collection-intro {
  display: grid;
  gap: var(--spacer);

  @media (--sm) {
    grid-template-columns: minmax(12rem, 18rem) 1fr;
    align-items: start;
  }

  h1 {
    margin: 0;

    small {
      color: var(--muted);
      font-size: max(0.95rem, 0.28em);
    }
  }
  
  .meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  menu {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
