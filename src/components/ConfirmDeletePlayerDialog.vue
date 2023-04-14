<template>
  <dialog :open="true">
    <article class="px-none" style="width:50vw;overflow:unset">
      <header class="mt-none mb-xl">
        <a href="#" aria-label="Close" class="close" @click.prevent="close"></a>
        <h5 class="mb-none">Delete {{ player.name }}</h5>
      </header>
      <div>Are you sure you want to delete {{ player.name }}?</div>
      <footer class="row items-center justify-end mt-xl">
        <a href="#" class="contrast mr-xl" @click.prevent="close">Cancel</a>
        <a href="#" class="negative" @click.prevent="deletePlayer" role="button">Delete</a>
      </footer>
    </article>
  </dialog>
</template>

<script setup lang="ts">
import { usePlayerStore } from 'stores/player';
import useToast from 'composables/toast';

const props = defineProps<{ player: Player }>();

const emit = defineEmits(['close']);

const playerStore = usePlayerStore();

function close() {
  emit('close');
}

function deletePlayer() {
  playerStore.deletePlayer(props.player.id);
  const toast = useToast({
    message: `Deleted ${props.player.name}`,
  });
  toast.show();
}
</script>