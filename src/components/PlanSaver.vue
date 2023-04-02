<template>
  <CSVSaver :rows="rows" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';
import CSVSaver from 'components/CSVSaver.vue';

const playerStore = usePlayerStore();

const { playersByKeepLevel } = storeToRefs(playerStore);

const rows = playersByKeepLevel.value.map(({ id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, hiveReinforcements, mountainReinforcements }) => {
  return {
    id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, hiveReinforcements, mountainReinforcements
  }
});
</script>