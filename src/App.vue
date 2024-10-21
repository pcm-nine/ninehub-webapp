<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="flex p-2">
    <nav class="flex">
      <RouterLink to="/" class="header-tab">Hjem</RouterLink>
      <RouterLink to="/about" class="header-tab">Om os</RouterLink>
    </nav>
  </header>

  <main class="h-full w-full flex">
    <RouterView />
  </main>
</template>
