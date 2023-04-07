<template>
  <label class="row items-end">
    <input :checked="hideNonParticipants" type="checkbox" @change="changeParticipantView">
    <small class="mb-none">Hide non-participants</small>
  </label>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from 'stores/player';

const playerStore = usePlayerStore();

const { hideNonParticipants } = storeToRefs(playerStore);

function changeParticipantView(event: Event) {
  const input = <HTMLInputElement | undefined>event.target;
  playerStore.hideNonParticipants = Boolean(input?.checked);
}
</script>