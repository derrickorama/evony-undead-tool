<template>
  <div>
    <select v-if="showSelect" class="mb-sm text-body2" @change="onSelect">
      <option value="">Select a Player</option>
      <optgroup label="Non-Reinforced Players">
        <option v-for="reinfPlayer in playerOptions" :value="reinfPlayer.id">
          {{ reinfPlayer.name }} k.{{
            reinfPlayer.keepLevel }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { usePlayerStore } from 'stores/player';

const props = defineProps<{ playerId: string; showSelect: boolean; }>();

const emit = defineEmits(['select']);

const { groupView, nonReinforcedPlayers, players } = storeToRefs(usePlayerStore());

const player = computed(() => players.value[props.playerId]);

const playerOptions = computed(() => {
  const players = nonReinforcedPlayers.value.filter(({ id, keepLevel }) => {
    if (id === props.playerId) {
      // Do not include themselves
      return false;
    }
    if (keepLevel >= player.value.keepLevel) {
      // Do not include keeps that are >= the reinforcer level
      return false;
    }
    return true;
  })

  // Sort by keep level
  players.sort((a, b) => {
    if (a.keepLevel > b.keepLevel) {
      return -1;
    } else if (b.keepLevel > a.keepLevel) {
      return 1;
    }
    return 0;
  })

  if (groupView.value === 'early') {
    return players.filter(({ isInEarlyGroup }) => isInEarlyGroup)
  }

  return players;
});

async function onSelect(event: Event) {
  const element = <HTMLSelectElement>event?.target;
  emit('select', element.value);
  element.value = '';
  element.selectedIndex = 0;
}
</script>