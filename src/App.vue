<template>
  <div class="container">
    <h1 class="mt-xl text-center">Undead Invasion Reinforcment Management Tool</h1>
    <div class="row">
      <PlanLoader class="full-width mb-none mr-sm" />
      <div class="row">
        <div class="mr-sm">
          <TextList />
        </div>
        <div>
          <PlanSaver />
        </div>
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
import NegativeBanner from 'components/NegativeBanner.vue';
import Options from 'components/Options.vue';
import PlanLoader from 'components/PlanLoader.vue';
import PlanSaver from 'components/PlanSaver.vue';
import PlayerTable from 'components/PlayerTable.vue';
import TextList from 'components/TextList.vue';

const group: Ref<'early' | 'hive'> = ref('early');

const playerStore = usePlayerStore();

const { groupView, nonReinforcedPlayers } = storeToRefs(playerStore);


</script>