<template>
  <a href="#" role="button" @click.prevent="showList">
    <ListBoxOutline />
  </a>
  <dialog :open="showDialog">
    <article class="px-none" style="width:50vw">
      <header class="mt-none mb-none">
        <a href="#" aria-label="Close" class="close" @click.prevent="showDialog = false"></a>
        Reinforcement List (Text)
      </header>
      <textarea rows="10" class="mt-xl pa-md" ref="list"></textarea>
    </article>
  </dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import { usePlayerStore } from 'stores/player';
import ListBoxOutline from 'vue-material-design-icons/ListBoxOutline';

const showDialog = ref(false);

const { players, playersByKeepLevel } = storeToRefs(usePlayerStore());

const list: Ref<HTMLTextAreaElement | null> = ref(null);
function showList() {
  let listText = '';

  playersByKeepLevel.value
    .filter(({ hiveReinforcements, isParticipant, mountainReinforcements }) => isParticipant && [...mountainReinforcements, ...hiveReinforcements].length)
    .forEach((player, index) => {
      if (index > 0) {
        listText += '\n';
      }
      listText += `${player.name} k.${player.keepLevel}\n`;
      player.mountainReinforcements.forEach((playerId) => {
        listText += `- ${players.value[playerId].name} k.${players.value[playerId].keepLevel} (early group)\n`;
      });
      player.hiveReinforcements.forEach((playerId) => {
        listText += `- ${players.value[playerId].name} k.${players.value[playerId].keepLevel}\n`;
      });
    });

  if (list.value) {
    list.value.value = listText;
  }

  showDialog.value = true;
}
</script>