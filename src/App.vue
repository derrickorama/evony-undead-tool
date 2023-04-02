<template>
  <div class="container">
    <h1 class="mt-xl text-center">Undead Invasion Reinforcment Management Tool</h1>
    <div class="row">
      <CSVLoader class="full-width mb-none mr-sm" @input="loadPlayers" />
      <div>
        <CSVSaver />
      </div>
    </div>
    <Options />
    <NegativeBanner v-if="nonReinforcedPlayers.length" centered
      :message="`${nonReinforcedPlayers.length} players are not reinforced`" />
    <AutoReinforceButton />
    <article>
      <div class="mb-md">
        <a href="#" class="mr-xl" :role="groupView === 'early' ? 'button' : undefined"
          @click.prevent="playerStore.viewGroup('early')">Early Group</a>
        <a href="#" :role="groupView === 'hive' ? 'button' : undefined"
          @click.prevent="playerStore.viewGroup('hive')">Hive Group</a>
      </div>
      <PlayerTable :group="group" />
    </article>
  </div>
</template>

<script setup lang="ts">
import '@picocss/pico/css/pico.min.css';
import './css/app.scss';

import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { usePlayerStore } from 'stores/player';
import AutoReinforceButton from 'components/AutoReinforceButton.vue';
import CSVLoader from 'components/CSVLoader.vue';
import CSVSaver from 'components/CSVSaver.vue';
import NegativeBanner from 'components/NegativeBanner.vue';
import Options from 'components/Options.vue';
import PlayerTable from 'components/PlayerTable.vue';

const group: Ref<'early' | 'hive'> = ref('early');

const playerStore = usePlayerStore();

const { groupView, nonReinforcedPlayers } = storeToRefs(playerStore);

async function loadPlayers(rows: Array<any[]>) {
  <['id', 'name', 'keepLevel', 'isParticipant', 'marches', 'earlyGroup', 'hiveReinforcements', 'mountainReinforcements']>rows.shift();

  playerStore.clear();

  rows.forEach((row: string[]) => {
    const [id, name, keepLevel, isParticipant, marches, isInEarlyGroup, hiveReinforcements = '', mountainReinforcements = ''] = row;

    return playerStore.add(<Player>{
      isInEarlyGroup: isInEarlyGroup === 'true',
      id,
      name,
      keepLevel: parseInt(keepLevel, 10),
      marches: parseInt(marches, 10) || 1,
      hiveReinforcements: hiveReinforcements.trim() ? hiveReinforcements.split(',') : [],
      mountainReinforcements: mountainReinforcements.trim() ? mountainReinforcements.split(',') : [],
      isParticipant: isParticipant === 'true',
      isReinforced: false,
    });
  })

  playerStore.processPendingReinfs();
}
</script>