<!-- layouts/default.vue -->
<script setup lang="ts">
import Navbar from '~/components/navbar/mainNavBar.vue'
</script>

<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>
