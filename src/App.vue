<template>
  <div class="container">
    <h1 class="mt-xl text-center">Undead Invasion Reinforcment Management Tool</h1>
    <div class="row">
      <CSVLoader class="full-width mb-none mr-sm" @input="loadPlayers" />
      <div>
        <CSVSaver />
      </div>
    </div>
    <article class="mt-none pa-sm">
      <label class="text-body2">
        <input :checked="hideNonParticipants" type="checkbox" @change="changeParticipantView"> Hide
        non-participants
      </label>
    </article>
    <NegativeBanner v-if="nonReinforcedPlayers.length"
      :message="`${nonReinforcedPlayers.length} players are not reinforced.`" />
    <PlayerTable />
  </div>
</template>

<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import './css/app.scss';

import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';
import CSVLoader from 'components/CSVLoader.vue';
import CSVSaver from 'components/CSVSaver.vue';
import PlayerTable from 'components/PlayerTable.vue';
import NegativeBanner from 'components/NegativeBanner.vue';

const playerStore = usePlayerStore();

const { hideNonParticipants, nonReinforcedPlayers } = storeToRefs(playerStore);

async function loadPlayers(rows: Array<any[]>) {
  <['id', 'name', 'keepLevel', 'isParticipant', 'marches', 'reinforcements']>rows.shift();

  playerStore.clear();

  rows.forEach((row: string[]) => {
    const [id, name, keepLevel, isParticipant, marches, reinforcements = ''] = row;

    return playerStore.add(<Player>{
      id,
      name,
      keepLevel: parseInt(keepLevel, 10),
      marches: parseInt(marches, 10) || 1,
      reinforcements: reinforcements.trim() ? reinforcements.split(',') : [],
      isParticipant: isParticipant === 'true',
      isReinforced: false,
    });
  })

  playerStore.autoReinforce();
}

function changeParticipantView(event: Event) {
  const input = <HTMLInputElement | undefined>event.target;
  playerStore.hideNonParticipants = Boolean(input?.checked);
}
</script>