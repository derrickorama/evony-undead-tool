<template>
  <NegativeBanner v-if="nonReinforcedPlayers.length" centered>
    <div>{{ nonReinforcedPlayers.length }} players are not reinforced</div>
    <ul>
      <li v-for="player in nonReinforcedPlayers">{{ player.name }} k.{{ player.keepLevel }}</li>
    </ul>
  </NegativeBanner>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';
import NegativeBanner from 'components/NegativeBanner.vue';

const playerStore = usePlayerStore();
const { nonReinforcedPlayers } = storeToRefs(playerStore);
</script>