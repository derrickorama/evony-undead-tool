<template>
  <a href="#" role="button" @click.prevent="save">
    <ContentSave />
  </a>
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import ContentSave from 'vue-material-design-icons/ContentSave';

const props = defineProps<{ rows: unknown[] }>();

function save() {
  const file = new Blob([Papa.unparse(props.rows)], { type: 'text/csv' });
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = 'reinf-plan.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
</script>