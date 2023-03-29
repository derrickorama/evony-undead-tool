<template>
  <article class="card bg-negative">
    {{ message }}
  </article>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<style scoped lang="scss">
.card {
  border: 1px solid red;
}
</style>