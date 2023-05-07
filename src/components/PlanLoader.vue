<template>
  <CSVLoader @input="loadPlayers" />
</template>

<script setup lang="ts">
import { usePlayerStore } from 'stores/player';
import CSVLoader from 'components/CSVLoader.vue';

const playerStore = usePlayerStore();

async function loadPlayers(rows: Array<any[]>) {
  rows.shift(); // Remove column names

  playerStore.clear();

  rows.forEach((row: string[]) => {
    const [id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, isOnHold, isExcluded, isNotEmpty, isNotBubbled, hiveReinforcements = '', mountainReinforcements = '', notes = ''] = row;

    return playerStore.add({
      isInEarlyGroup: isInEarlyGroup === 'true',
      id,
      name,
      keepLevel: parseInt(keepLevel, 10),
      marches: parseInt(marches, 10) || 1,
      hiveReinforcements: hiveReinforcements.trim() ? hiveReinforcements.split(',') : [],
      mountainReinforcements: mountainReinforcements.trim() ? mountainReinforcements.split(',') : [],
      isExcluded: isExcluded === 'true',
      isNotBubbled: isNotBubbled === 'true',
      isNotEmpty: isNotEmpty === 'true',
      isOnHold: isOnHold === 'true',
      isParticipant: isParticipant === 'true',
      isXxl: isXxl === 'true',
      notes,
    });
  });
}
</script>