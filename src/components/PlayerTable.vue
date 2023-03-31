<template>
  <table>
    <thead>
      <tr>
        <th>Player</th>
        <th>Keep Level</th>
        <th>Participant</th>
        <th>Marches</th>
        <th>Is Reinforced</th>
        <th>Reinforcing</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in players" :key="player.name">
        <td>
          <div>{{ player.name }}</div>
          <small class="text-grey">{{ player.id }}</small>
        </td>
        <td>{{ player.keepLevel }}</td>
        <td>
          <input type="checkbox" name="switch" role="switch" :checked="player.isParticipant"
            @change="setParticipation($event, player.id)">
        </td>
        <td>
          <select v-model="player.marches">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </td>
        <td :class="{ 'text-negative': !player.isReinforced }">{{
          player.isReinforced
          ? 'Yes' : 'No' }}</td>
        <td>
          <div>
            <Reinforcement v-for="playerId in player.reinforcements" :player-id="player.id" :reinf-player-id="playerId" />
          </div>
          <PlayerSelector :class="{ 'q-mt-sm': player.reinforcements.length }" :player-id="player.id"
            :show-select="player.marches - player.reinforcements.length > 0"
            @select="playerStore.reinforce(player.id, $event)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { usePlayerStore } from 'stores/player';
import PlayerSelector from 'components/PlayerSelector.vue';
import Reinforcement from 'components/Reinforcement.vue';

const playerStore = usePlayerStore();

const { hideNonParticipants, playersByKeepLevel } = storeToRefs(playerStore);

const players = computed(() => {
  if (hideNonParticipants.value) {
    return playersByKeepLevel.value.filter(({ isParticipant }) => isParticipant)
  }
  return playersByKeepLevel.value;
});

function setParticipation(event: Event, playerId: string) {
  const input = <HTMLInputElement>event.target;
  playerStore.setParticipation(playerId, input.checked);
}
</script>