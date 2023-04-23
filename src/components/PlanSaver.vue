<template>
  <CSVSaver :rows="rows" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePlayerStore } from 'stores/player';
import CSVSaver from 'components/CSVSaver.vue';

const playerStore = usePlayerStore();

const { playersByKeepLevel } = storeToRefs(playerStore);

const rows = computed(() => playersByKeepLevel.value.map(({ id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, isOnHold, isExcluded, isNotEmpty, hiveReinforcements, mountainReinforcements, notes }) => {
  return {
    id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, isOnHold, isExcluded, isNotEmpty, hiveReinforcements, mountainReinforcements, notes
  }
}));
</script>