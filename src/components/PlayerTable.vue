<template>
  <table>
    <thead>
      <tr>
        <th>Participant</th>
        <th>Player</th>
        <th>Reinforcing</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in players" :key="player.name">
        <td>
          <input type="checkbox" name="switch" role="switch" :checked="player.isParticipant"
            @change="setParticipation($event, player.id)">
        </td>
        <td>
          <div>{{ player.name }} <small>k.{{ player.keepLevel }}</small></div>
          <small v-if="false" class="text-grey">{{ player.id }}</small>
          <div class="row">
            <SizeXxl v-if="player.isXxl" />
            <ImageFilterHdr v-if="player.isInEarlyGroup" />
          </div>
          <div v-if="!player.isReinforced" class="row items-center text-negative">
            <Alert class="mr-xs" /> Not reinforced
          </div>
        </td>
        <td>
          <small class="row items-center text-grey">
            <AccountGroup class="relative mr-xs" size="20px" style="top:-3px" /> {{ player.marches }} marches
          </small>
          <div class="mt-sm">
            <Reinforcement v-for="playerId in player[reinforcementGroup]" :player-id="player.id"
              :reinf-player-id="playerId" />
          </div>
          <PlayerSelector :class="{ 'q-mt-sm': player[reinforcementGroup].length }" :player-id="player.id"
            :show-select="player.marches - player[reinforcementGroup].length > 0"
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
import Alert from 'vue-material-design-icons/Alert';
import AccountGroup from 'vue-material-design-icons/AccountGroup';
import ImageFilterHdr from 'vue-material-design-icons/ImageFilterHdr';
import SizeXxl from 'vue-material-design-icons/SizeXxl';
import PlayerSelector from 'components/PlayerSelector.vue';
import Reinforcement from 'components/Reinforcement.vue';

const playerStore = usePlayerStore();

const { groupView, hideNonParticipants, playersByKeepLevel, playersInEarlyGroup, reinforcementGroup } = storeToRefs(playerStore);

const players = computed(() => {
  const playersList = groupView.value === 'early' ? playersInEarlyGroup.value : playersByKeepLevel.value;
  if (hideNonParticipants.value) {
    return playersList.filter(({ isParticipant }) => isParticipant)
  }
  return playersList;
});

function setInEarlyGroup(event: Event, playerId: string) {
  const input = <HTMLInputElement>event.target;
  playerStore.setInEarlyGroup(playerId, input.checked);
}

function setParticipation(event: Event, playerId: string) {
  const input = <HTMLInputElement>event.target;
  playerStore.setParticipation(playerId, input.checked);
}
</script>