<template>
  <div>
    <select v-if="show" class="mb-sm text-body2" @change="onSelect">
      <option value="">Select a Player</option>
      <optgroup label="Non-Reinforced Players">
        <option v-for="reinfPlayer in playerOptions" :value="reinfPlayer.id">
          {{ reinfPlayer.name }} k.{{
            reinfPlayer.keepLevel }}
        </option>
      </optgroup>
    </select>
    <div v-if="showAdd"><a href="#" role="button" class="pa-sm py-none text-body2" @click.prevent="show = true">Add</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { usePlayerStore } from '../stores/player';

const props = defineProps<{ playerId: string; showAdd: boolean; showSelect: boolean; }>();

const emit = defineEmits(['select']);

const { nonReinforcedPlayers } = storeToRefs(usePlayerStore());

const show = ref(false);

const playerOptions = computed(() => nonReinforcedPlayers.value.filter(({ id }) => id !== props.playerId));

onMounted(() => {
  if (props.showSelect) {
    show.value = props.showSelect;
  }
})

async function onSelect(event: Event) {
  const element = <HTMLSelectElement>event?.target;
  show.value = false;
  emit('select', element.value);
}
</script>