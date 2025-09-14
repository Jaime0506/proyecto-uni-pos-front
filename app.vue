<script setup lang="ts">
const message = "Hello World";
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtPage />
        <p>{{ message }}</p>
    </div>
</template>
