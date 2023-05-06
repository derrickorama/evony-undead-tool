<template>
  <dialog :open="true">
    <article class="px-none" style="width:50vw">
      <header class="mt-none mb-xl">
        <a href="#" aria-label="Close" class="close" @click.prevent="close"></a>
        Edit Player: {{ player.name }}
      </header>
      <form @submit="save">
        <label>
          Name
          <input type="text" name="name" required v-model="name">
        </label>
        <label>
          Level
          <input type="text" name="level" required v-model="keepLevel">
        </label>
        <label>
          Marches {{ marches }}
          <select class="mb-sm text-body2" v-model="marches">
            <option v-for="count in 6" :value="count" :selected="marches === count">
              {{ count }}
            </option>
          </select>
        </label>
        <article class="my-xl">
          <label>
            Exclude
            <input type="checkbox" role="switch" :checked="isExcluded" @change="setValueFromTarget($event, 'isExcluded')">
          </label>
          <label>
            On Hold
            <input type="checkbox" role="switch" :checked="isOnHold" @change="setValueFromTarget($event, 'isOnHold')">
          </label>
          <label>
            Early Group
            <input type="checkbox" role="switch" :checked="player.isInEarlyGroup"
              @change="setValueFromTarget($event, 'isInEarlyGroup')">
          </label>
          <label>
            XXL
            <input type="checkbox" role="switch" :checked="player.isXxl" @change="setValueFromTarget($event, 'isXxl')">
          </label>
          <label>
            Not Emptying Keep
            <input type="checkbox" role="switch" :checked="isNotEmpty" @change="setValueFromTarget($event, 'isNotEmpty')">
          </label>
        </article>
        <article class="my-xl">
          <label>
            Notes
            <textarea class="notes full-width" @change="setValueFromTarget($event, 'notes')">{{ notes }}</textarea>
          </label>
        </article>
        <div class="row justify-between">
          <div class="row items-center">
            <a href="#" class="text-negative" @click.prevent="showDeleteDialog = true">Delete</a>
          </div>
          <div class="row items-center justify-end">
            <a href="#" class="contrast mr-xl" @click.prevent="close">Cancel</a>
            <a href="#" @click.prevent="save" role="button">Save</a>
          </div>
        </div>
      </form>
    </article>
    <ConfirmDeletePlayerDialog v-if="showDeleteDialog" :player="player" @close="showDeleteDialog = false" />
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlayerStore } from 'stores/player';
import ConfirmDeletePlayerDialog from 'components/ConfirmDeletePlayerDialog.vue';

const props = defineProps<{ player: Player }>();

const emit = defineEmits(['close']);

const show = ref(true);
const showDeleteDialog = ref(false);

const isExcluded = ref(props.player.isExcluded);
const isInEarlyGroup = ref(props.player.isInEarlyGroup);
const isNotEmpty = ref(props.player.isNotEmpty);
const isOnHold = ref(props.player.isOnHold)
const isXxl = ref(props.player.isXxl);
const keepLevel = ref(`${props.player.keepLevel}`);
const marches = ref(props.player.marches);
const name = ref(props.player.name);
const notes = ref(props.player.notes);

const playerStore = usePlayerStore();

function close() {
  show.value = false;
  emit('close');
}

function save() {
  playerStore.updatePlayer(props.player.id, {
    isNotEmpty: isNotEmpty.value,
    isOnHold: isOnHold.value,
    isExcluded: isExcluded.value,
    isInEarlyGroup: isInEarlyGroup.value,
    isXxl: isXxl.value,
    keepLevel: parseInt(keepLevel.value, 10),
    marches: parseInt(marches.value, 10),
    name: name.value,
    notes: notes.value,
  });
  close();
}

function setValueFromTarget(event: Event, type: 'isInEarlyGroup' | 'isNotEmpty' | 'isOnHold' | 'isExcluded' | 'isXxl' | 'notes') {
  const input = event.target instanceof HTMLInputElement ? <HTMLInputElement>event.target : <HTMLTextAreaElement>event.target;
  const value = input instanceof HTMLInputElement ? input.checked : input.value;

  switch (type) {
    case 'isInEarlyGroup':
      isInEarlyGroup.value = value;
      break;
    case 'isNotEmpty':
      isNotEmpty.value = value;
      break;
    case 'isOnHold':
      isOnHold.value = value;
      break;
    case 'isExcluded':
      isExcluded.value = value;
      break;
    case 'isXxl':
      isXxl.value = value;
      break;
    case 'notes':
      notes.value = value;
      break;
    default:
  }
}
</script>

<style scoped lang="scss">
.notes {
  resize: vertical;
}
</style>