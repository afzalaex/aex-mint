<template>
  <svg v-if="type === 'website'" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon" style="margin-right: 4px;">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
  <i v-else-if="ICONS[type]" class="icon">
    {{ symbol }}
  </i>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
})

const ICONS = {
  'add': '',
  'check': '',
  'chevron-down': '',
  'chevron-right': '',
  'chevron-up': '',
  'close': '✕',
  'code': '',
  'discord': '',
  'edit': '',
  'email': '',
  'folder': '',
  'github': '',
  'home': '',
  'image': '',
  'link': '',
  'loader': '',
  'maximize': '',
  'times': '✕',
  'trash': '',
  'twitter': '𝕏',
  'user': '',
  'website': '🌐',
  'withdraw': '',
}

const symbol = computed(() => ICONS[props.type])
</script>

<style scoped>
.icon {
  display: inline-block;
  font-style: normal;
  color: #ffffff;
}
</style>
