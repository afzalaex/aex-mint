<template>
  <Loading v-if="! artist" />
  <PageFrame v-else title="Profile">
    <ProfileHeader :address="address" />

    <section class="profile-coming-soon">
      <div class="coming-soon-message">
        <p>Collected art from <strong>{{ artistName }}</strong> will be indexed on profiles soon...</p>
        <p>You can mint your own art on <a href="https://networked.art" target="_blank">networked.art</a>.</p>
      </div>
    </section>
  </PageFrame>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const address = computed(() => route.params.address)
const store = useOnchainStore()

const artistId = config.public.creatorAddress
const artist = ref(null)
const artistName = computed(() => store.artist(artistId)?.ens || shortAddress(artistId))

const load = async () => {
  await store.fetchArtistScope(address.value, config.public.factoryAddress)
  artist.value = store.artist(address.value)
}
onMounted(() => load())

useMetaData({
  title: artist.value?.ens || shortAddress(address.value),
})
</script>
