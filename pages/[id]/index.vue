<template>
  <PageFrame class="inset">
    <Loading txt="Opening collection..." />
  </PageFrame>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const id = useArtistId()
const collectionAddress = String(config.public.collectionAddress || '').toLowerCase()

if (id.value && collectionAddress) {
  await navigateTo(
    {
      name: 'id-collection',
      params: {
        id: id.value,
        collection: collectionAddress,
      },
    },
    {
      replace: true,
    },
  )
}
</script>
