<template>
  <svg
    v-if="icon"
    class="icon"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="icon.viewBox || '0 0 24 24'"
    :fill="icon.fill || 'none'"
    :stroke="icon.stroke || 'currentColor'"
    :stroke-width="icon.strokeWidth || 1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g v-html="icon.body" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
})

const ICONS = {
  add: {
    body: '<path d="M12 5v14" /><path d="M5 12h14" />',
  },
  check: {
    body: '<path d="M5 12.5l4.5 4.5L19 7" />',
  },
  'chevron-down': {
    body: '<path d="M6 9l6 6 6-6" />',
  },
  'chevron-right': {
    body: '<path d="M9 6l6 6-6 6" />',
  },
  'chevron-up': {
    body: '<path d="M6 15l6-6 6 6" />',
  },
  close: {
    body: '<path d="M6 6l12 12" /><path d="M18 6L6 18" />',
  },
  code: {
    body: '<path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M14 4l-4 16" />',
  },
  discord: {
    body: '<path d="M8.5 8.5A10.5 10.5 0 0 1 12 8c1.2 0 2.4.2 3.5.5" /><path d="M8 16.5c1.2.6 2.6.9 4 .9s2.8-.3 4-.9" /><path d="M7.5 9.5c-1.1 1.1-1.7 2.6-1.7 4.5l2 1.8 1.6-.9c.8.2 1.7.3 2.6.3s1.8-.1 2.6-.3l1.6.9 2-1.8c0-1.9-.6-3.4-1.7-4.5" /><circle cx="10" cy="12" r="1" /><circle cx="14" cy="12" r="1" />',
  },
  edit: {
    body: '<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />',
  },
  email: {
    body: '<rect x="3" y="6" width="18" height="12" rx="2" /><path d="m4 8 8 6 8-6" />',
  },
  folder: {
    body: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5Z" />',
  },
  github: {
    body: '<path d="M9 18c-3.5 1-3.5-2-5-2" /><path d="M15 22v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.7A5.2 5.2 0 0 0 18.7 6 4.8 4.8 0 0 0 18.6 3s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6 0C6.5 2.7 5.4 3 5.4 3a4.8 4.8 0 0 0-.1 3A5.2 5.2 0 0 0 3.8 9.5c0 5.2 3.1 6.4 6.1 6.7A3 3 0 0 0 9 18.5V22" />',
  },
  home: {
    body: '<path d="M4 10.5 12 4l8 6.5" /><path d="M6.5 9.5V20h11V9.5" />',
  },
  image: {
    body: '<rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="m21 15-4.5-4.5L9 18" />',
  },
  link: {
    body: '<path d="M10 14 8 16a3 3 0 0 1-4.2-4.2l3-3A3 3 0 0 1 11 9" /><path d="M14 10l2-2a3 3 0 1 1 4.2 4.2l-3 3A3 3 0 0 1 13 15" /><path d="M8 12h8" />',
  },
  loader: {
    body: '<path d="M12 3a9 9 0 1 0 9 9" />',
  },
  maximize: {
    body: '<path d="M15 4h5v5" /><path d="M9 20H4v-5" /><path d="m20 4-7 7" /><path d="m4 20 7-7" />',
  },
  plus: {
    body: '<path d="M12 5v14" /><path d="M5 12h14" />',
  },
  times: {
    body: '<path d="M6 6l12 12" /><path d="M18 6L6 18" />',
  },
  trash: {
    body: '<path d="M4 7h16" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M6 7l1 12h10l1-12" /><path d="M9 7V4h6v3" />',
  },
  twitter: {
    fill: 'currentColor',
    stroke: 'none',
    strokeWidth: 0,
    body: '<path d="M18.9 3H21l-6.9 7.88L22 21h-6.2l-4.86-6.35L5.4 21H3l7.39-8.45L2 3h6.36l4.39 5.8L18.9 3Zm-1.09 16.15h1.72L7.3 4.76H5.45Z" />',
  },
  user: {
    body: '<circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" />',
  },
  website: {
    body: '<circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.2 2.4 3.5 5.6 3.5 9S14.2 18.6 12 21c-2.2-2.4-3.5-5.6-3.5-9S9.8 5.4 12 3Z" />',
  },
  withdraw: {
    body: '<rect x="3" y="7" width="18" height="10" rx="2" /><path d="M10 12h8" /><path d="m15 9 3 3-3 3" /><path d="M6.5 10h.01" /><path d="M6.5 14h.01" />',
  },
}

const icon = computed(() => props.type ? ICONS[props.type] : null)
</script>

<style scoped>
.icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 1;
  vertical-align: middle;
}

.icon.spin {
  animation: spin 1s linear infinite;
  transform-origin: center;
}
</style>
