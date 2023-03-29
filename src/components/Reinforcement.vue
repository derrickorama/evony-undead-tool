<template>
  <div v-if="player" class="row line-height-1">
    <CloseBoxOutline class="cursor-pointer" @click="remove" />
    <div>
      {{ player.name }} <small class="italic text-grey">k.{{ player.keepLevel }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePlayerStore } from 'stores/player';
import CloseBoxOutline from 'vue-material-design-icons/CloseBoxOutline';

const props = defineProps<{ playerId: string; reinfPlayerId: string; }>();

const playerStore = usePlayerStore();

const { players } = storeToRefs(playerStore);

const player = computed(() => <Player | undefined>players.value[props.reinfPlayerId]);

function remove() {
  playerStore.unreinforce(props.playerId, props.reinfPlayerId);
}
</script>