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

const name = ref(props.player.name);
const keepLevel = ref(`${props.player.keepLevel}`);

const playerStore = usePlayerStore();

function close() {
  show.value = false;
  emit('close');
}

function save() {
  playerStore.updatePlayer(props.player.id, { keepLevel: parseInt(keepLevel.value, 10), name: name.value });
  close();
}
</script>