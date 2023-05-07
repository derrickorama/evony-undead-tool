<template>
  <div class="container">
    <h1 class="mt-xl text-center">Undead Invasion Reinforcement Management Tool</h1>
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
    <NonReinforcedBanner />
    <NegativeBanner v-if="loadErrors.length">
      <ul>
        <li v-for="error in loadErrors">{{ error }}</li>
      </ul>
    </NegativeBanner>
    <AutoReinforceButton v-if="false" />
    <article>
      <div class="row justify-between">
        <div class="mb-md">
          <a href="#" class="mr-xl" :role="groupView === 'early' ? 'button' : undefined"
            @click.prevent="playerStore.viewGroup('early')">
            <ImageFilterHdr /> Early Group
          </a>
          <a href="#" :role="groupView === 'hive' ? 'button' : undefined" @click.prevent="playerStore.viewGroup('hive')">
            <BeehiveOutline /> Hive Group
          </a>
        </div>
        <div>
          <Options />
        </div>
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
import BeehiveOutline from 'vue-material-design-icons/BeehiveOutline';
import ImageFilterHdr from 'vue-material-design-icons/ImageFilterHdr';
import AutoReinforceButton from 'components/AutoReinforceButton.vue';
import NegativeBanner from 'components/NegativeBanner.vue';
import Options from 'components/Options.vue';
import PlanLoader from 'components/PlanLoader.vue';
import PlanSaver from 'components/PlanSaver.vue';
import PlayerTable from 'components/PlayerTable.vue';
import TextList from 'components/TextList.vue';
import NonReinforcedBanner from 'components/NonReinforcedBanner.vue';

const group: Ref<'early' | 'hive'> = ref('early');

const playerStore = usePlayerStore();

const { groupView, loadErrors, nonReinforcedPlayers } = storeToRefs(playerStore);


</script>