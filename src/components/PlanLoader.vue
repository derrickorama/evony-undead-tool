<template>
  <CSVLoader @input="loadPlayers" />
</template>

<script setup lang="ts">
import CSVLoader from 'components/CSVLoader.vue';
import { usePlayerStore } from 'stores/player';

const playerStore = usePlayerStore();

async function loadPlayers(rows: Array<any[]>) {
  <['id', 'name', 'keepLevel', 'isParticipant', 'marches', 'isInEarlyGroup', 'isXxl', 'isOnHold', 'isExcluded', 'isNotEmpty', 'hiveReinforcements', 'mountainReinforcements', 'notes']>rows.shift();

  playerStore.clear();

  rows.forEach((row: string[]) => {
    const [id, name, keepLevel, isParticipant, marches, isInEarlyGroup, isXxl, isOnHold, isExcluded, isNotEmpty, hiveReinforcements = '', mountainReinforcements = '', notes = ''] = row;

    return playerStore.add(<Player>{
      isInEarlyGroup: isInEarlyGroup === 'true',
      id,
      name,
      keepLevel: parseInt(keepLevel, 10),
      marches: parseInt(marches, 10) || 1,
      hiveReinforcements: hiveReinforcements.trim() ? hiveReinforcements.split(',') : [],
      mountainReinforcements: mountainReinforcements.trim() ? mountainReinforcements.split(',') : [],
      isExcluded: isExcluded === 'true',
      isNotEmpty: isNotEmpty === 'true',
      isOnHold: isOnHold === 'true',
      isParticipant: isParticipant === 'true',
      isReinforced: isXxl === 'true' || isExcluded === 'true', // flag as reinforced if XXL
      isXxl: isXxl === 'true',
      notes,
    });
  })

  playerStore.processPendingReinfs();
}
</script>