<template>
  <div class="aex-shell">
    <div class="aex-shell__mesh" aria-hidden="true" />
    <div class="aex-shell__orb aex-shell__orb--left" aria-hidden="true" />
    <div class="aex-shell__orb aex-shell__orb--right" aria-hidden="true" />

    <AppHeader />

    <main class="aex-shell__content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.aex-shell {
  position: relative;
  min-height: 100dvh;
  overflow-x: clip;
}

.aex-shell__content {
  position: relative;
  display: grid;
  gap: var(--spacer);
  z-index: 1;
}

.aex-shell__mesh,
.aex-shell__orb {
  pointer-events: none;
  position: fixed;
  inset: 0;
}

.aex-shell__mesh {
  z-index: 0;
  background:
    linear-gradient(to bottom, rgba(255, 248, 236, 0.72), rgba(241, 234, 223, 0.2)),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 23px,
      rgba(18, 16, 13, 0.045) 23px,
      rgba(18, 16, 13, 0.045) 24px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 23px,
      rgba(18, 16, 13, 0.045) 23px,
      rgba(18, 16, 13, 0.045) 24px
    );
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.2));
}

.aex-shell__orb {
  z-index: 0;
  filter: blur(90px);
  opacity: 0.75;
}

.aex-shell__orb--left {
  background: radial-gradient(circle at 18% 20%, rgba(228, 90, 43, 0.26), transparent 35%);
  animation: drift-left 18s ease-in-out infinite alternate;
}

.aex-shell__orb--right {
  background: radial-gradient(circle at 82% 10%, rgba(28, 26, 24, 0.14), transparent 32%);
  animation: drift-right 24s ease-in-out infinite alternate;
}

@keyframes drift-left {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(-2%, 6%, 0) scale(1.08);
  }
}

@keyframes drift-right {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(3%, -4%, 0) scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aex-shell__orb--left,
  .aex-shell__orb--right {
    animation: none;
  }
}
</style>
