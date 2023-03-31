<template>
  <div class="full-width row justify-end mb-md">
    <a class="pa-sm text-body2" :class="{ 'disabled': !hasPlayers }" href="#" role="button"
      @click.prevent="playerStore.autoReinforce()">Auto
      Reinforce</a>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';

const playerStore = usePlayerStore();

const { hasPlayers } = storeToRefs(playerStore);
</script>