<template>
  <a href="#" role="button" @click.prevent="save">
    <ContentSave />
  </a>
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';
import ContentSave from 'vue-material-design-icons/ContentSave';

const { playersByKeepLevel } = storeToRefs(usePlayerStore())

function save() {
  const players = playersByKeepLevel.value.map(({ id, name, keepLevel, isParticipant, marches, reinforcements }) => {
    return {
      id, name, keepLevel, isParticipant, marches, reinforcements
    }
  })

  const file = new Blob([Papa.unparse(players)], { type: 'text/csv' });
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