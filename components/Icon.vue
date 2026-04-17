<template>
  <i v-if="ICONS[type]" class="icon">
    {{ symbol }}
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
})

const ICONS = {
  'add': '+',
  'check': '✓',
  'chevron-down': '↓',
  'chevron-right': '→',
  'chevron-up': '↑',
  'close': '✕',
  'code': '{/}',
  'discord': 'Discord',
  'edit': 'Edit',
  'email': '@',
  'folder': '/',
  'github': 'GitHub',
  'home': 'Home',
  'image': 'Img',
  'link': 'Link',
  'loader': '...',
  'maximize': '[ ]',
  'times': '✕',
  'trash': 'Del',
  'twitter': 'X',
  'user': 'User',
  'website': 'Web',
  'withdraw': 'ETH',
}

const symbol = computed(() => ICONS[props.type])
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-style: normal;
  line-height: 1;
}
</style>
