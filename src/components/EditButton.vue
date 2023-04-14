<template>
  <div class="cursor-pointer" :class="{ 'text-light-grey': !mayEdit }" @mouseover="mayEdit = true"
    @mouseout="mayEdit = false" @blur="mayEdit = false" @focus="mayEdit = true" @click="showDialog = true">
    <Pencil class="edit" :size="20" />
  </div>
  <EditPlayerDialog v-if="showDialog" :player="player" @close="showDialog = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pencil from 'vue-material-design-icons/Pencil';
import EditPlayerDialog from 'components/EditPlayerDialog.vue';

defineProps<{ player: Player }>();

const mayEdit = ref(false);
const showDialog = ref(false);
</script>
