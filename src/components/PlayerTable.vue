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
          <input v-if="!player.isExcluded && !player.isOnHold" type="checkbox" name="switch" role="switch"
            :checked="player.isParticipant" @change="setParticipation($event, player.id)">
        </td>
        <td>
          <div class="row items-end">
            <span class="mr-xs">{{ player.name }} </span>
            <small class="mr-xs">k.{{ player.keepLevel }}</small>
            <EditButton :player="player" />
          </div>
          <small v-if="false" class="text-grey">{{ player.id }}</small>
          <div class="row">
            <SizeXxl v-if="player.isXxl" />
            <ImageFilterHdr v-if="player.isInEarlyGroup" />
            <AccountCancel v-if="player.isExcluded" />
            <Sleep v-if="player.isOnHold" />
            <City v-if="player.isNotEmpty" />
          </div>
          <div v-if="!player.isReinforced" class="row items-center text-negative">
            <Alert class="mr-xs" /> Not reinforced
          </div>
        </td>
        <td>
          <small class="row items-center text-grey">
            <AccountGroup class="relative mr-xs" :size="20" style="top:-3px" /> {{ player.marches }} march{{
              player.marches === 1 ? '' : 'es' }}
          </small>
          <div v-if="!player.isExcluded && !player.isOnHold" class="mt-sm">
            <Reinforcement v-for="playerId in player[reinforcementGroup]" :player-id="player.id"
              :reinf-player-id="playerId" />
          </div>
          <PlayerSelector :class="{ 'q-mt-sm': player[reinforcementGroup].length }" :player-id="player.id"
            :show-select="player.marches - player[reinforcementGroup].length > 0 && !player.isExcluded && !player.isOnHold"
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
import AccountCancel from 'vue-material-design-icons/AccountCancel';
import City from 'vue-material-design-icons/City';
import ImageFilterHdr from 'vue-material-design-icons/ImageFilterHdr';
import SizeXxl from 'vue-material-design-icons/SizeXxl';
import Sleep from 'vue-material-design-icons/Sleep';
import EditButton from 'components/EditButton.vue';
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

<style scoped lang="scss">
.edit {
  font-size: 0.8em;
}
</style>