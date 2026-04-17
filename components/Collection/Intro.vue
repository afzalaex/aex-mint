<template>
  <header class="collection-intro">
    <figure v-if="collection.image">
      <Image :src="collection.image" :alt="collection.name" />
    </figure>

    <div class="text">
      <div>
        <span class="eyebrow">Aex Designs</span>
        <h1>
          {{ collection.name || $t('collection.unnamed') }}
          <small v-if="collection.symbol">({{ collection.symbol }})</small>
        </h1>
        <p v-if="collection.description">
          <ExpandableText :text="collection.description" />
        </p>
      </div>

      <div class="meta" v-if="id">
        <NuxtLink :to="{ name: 'id', params: { id } }">
          by {{ store.displayName(id) }}
        </NuxtLink>
        <span>{{ collection.latestTokenId }} {{ $t('tokens', Number(collection.latestTokenId)) }}</span>
        <span>block {{ collection.initBlock }}</span>
      </div>

      <menu class="links">
        <Button :to="projectUrl" target="_blank">
          <span>Project Site</span>
        </Button>
        <Button :to="mintUrl" target="_blank">
          <span>Original Mint Page</span>
        </Button>
        <Button :to="explorerUrl" target="_blank" class="link">
          <span>View Contract</span>
        </Button>
      </menu>

      <CollectionActions :collection="collection" />
    </div>
  </header>
</template>

<script setup lang="ts">
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
      font-family: var(--ui-font-family);
      letter-spacing: var(--ui-letter-spacing);
      text-transform: uppercase;
    }
  }

  menu {
    list-style: none;
  }
}
</style>
