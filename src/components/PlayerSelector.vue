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

const { nonReinforcedPlayers } = storeToRefs(usePlayerStore());

const playerOptions = computed(() => nonReinforcedPlayers.value.filter(({ id }) => id !== props.playerId));

async function onSelect(event: Event) {
  const element = <HTMLSelectElement>event?.target;
  emit('select', element.value);
  element.value = '';
  element.selectedIndex = 0;
}
</script>