<template>
  <article class="column mt-none pa-sm text-body2">
    <div>
      <label>
        <input :checked="hideNonParticipants" type="checkbox" @change="changeParticipantView"> Hide
        non-participants
      </label>
    </div>
  </article>
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