<template>
  <form ref="form">
    <button class="relative">
      Load Player Data
      <input class="absolute input cursor-pointer full-width full-height" type="file" @input="loadCSV">
    </button>
  </form>
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import type { Ref } from 'vue';
import { ref } from 'vue';

const emit = defineEmits(['input'])

const form: Ref<HTMLFormElement | null> = ref(null);

async function loadCSV(event: Event) {
  const input = <HTMLInputElement>event.target;
  const file = input.files?.item(0);
  const text = await file?.text() || '';

  const csv = Papa.parse(text);

  emit('input', csv.data);

  form.value?.reset();
}
</script>

<style scoped lang="scss">
.input {
  top: 0;
  left: 0;
  opacity: 0;
}
</style>