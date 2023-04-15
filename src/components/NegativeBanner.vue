<template>
  <article class="card bg-negative" :class="{ 'text-center': centered }">
    <slot>{{ message }}</slot>
  </article>
</template>

<script setup lang="ts">
defineProps<{ centered?: boolean; message?: string }>();
</script>

<style scoped lang="scss">
.card {
  border: 1px solid rgb(160, 0, 0);
  color: rgb(60, 20, 20);
}
</style>