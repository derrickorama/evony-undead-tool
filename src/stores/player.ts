import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    hideNonParticipants: true,
    players: {} as { [playerId: string]: Player },
  }),
  getters: {
    hasPlayers(state) {
      return Object.keys(state).length > 0;
    },
    nonReinforcedPlayers(): Player[] {
      return this.playersByName.filter(({ isReinforced }) => !isReinforced);
    },
    participantPlayers(): Player[] {
      return this.playersByKeepLevel.filter(({ isParticipant }) => isParticipant);
    },
    playersByKeepLevel(state) {
      const sortedPlayers = Object.keys(state.players).map((playerId) => {
        return state.players[playerId]
      }).sort((a, b) => {
        if (a.keepLevel > b.keepLevel) {
          return -1;
        } else if (b.keepLevel > a.keepLevel) {
          return 1;
        }
        return 0;
      });
      return sortedPlayers;
    },
    playersByName(): Player[] {
      const sortedPlayers = [...this.playersByKeepLevel].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return sortedPlayers;
    },
    playersByParticipation(): Player[] {
      const sortedPlayers = [...this.playersByKeepLevel].sort((a, b) => {
        if (a.isParticipant && !b.isParticipant) {
          return -1;
        } else if (b.isParticipant && !a.isParticipant) {
          return 1;
        }
        return 0;
      });
      return sortedPlayers;
    }
  },
  actions: {
    add(playerData: Player) {
      this.players[playerData.id] = playerData;
    },
    clear() {
      this.players = {};
    },
    autoReinforce() {
      this.participantPlayers.forEach((player) => {
        const reinforcablePlayers = this.nonReinforcedPlayers.filter(({ keepLevel }) => {
          return player.keepLevel - keepLevel >= 1;
        });

        const { marches } = player;

        for (let i = 0; i < reinforcablePlayers.length - 1 && player.reinforcements.length <= marches; i += 1) {
          const option = reinforcablePlayers[i];
          const reinfPlayer = this.players[option.id];
          reinfPlayer.isReinforced = true;
          player.reinforcements.push(option.id);
        }
      })
    },
    reinforce(playerId: string, reinfPlayerId: string) {
      this.players[playerId].reinforcements.push(reinfPlayerId);
      this.players[reinfPlayerId].isReinforced = true;
    },
    setParticipation(playerId: string, isParticipant: boolean) {
      this.players[playerId].isParticipant = isParticipant;
    },
    unreinforce(playerId: string, reinfPlayerId: string) {
      const player = this.players[playerId];
      const playerIndex = player.reinforcements.findIndex((id) => id === reinfPlayerId);
      player.reinforcements.splice(playerIndex, 1);
      this.players[reinfPlayerId].isReinforced = false;
    }
  },
})