<template>
  <div class="aex-shell">
    <AppHeader />

    <main class="aex-shell__content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.aex-shell {
  min-height: 100dvh;
  background: var(--background);
  color: var(--color);
}

.aex-shell__content {
  display: grid;
  gap: 0;
}
</style>
