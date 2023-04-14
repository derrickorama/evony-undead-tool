import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    groupView: 'hive' as 'early' | 'hive',
    hideNonParticipants: true,
    players: {} as { [playerId: string]: Player },
    pendingReinfs: [] as string[],
  }),
  getters: {
    hasPlayers(state) {
      return Object.keys(state).length > 0;
    },
    nonReinforcedPlayers(): Player[] {
      return this.playersByName.filter(({ isReinforced, isXxl }) => !isReinforced && !isXxl);
    },
    participantPlayers(): Player[] {
      return this.playersByKeepLevel.filter(({ isParticipant }) => isParticipant);
    },
    playersByKeepLevel(state) {
      const sortedPlayers = Object.keys(state.players)
        .map((playerId) => {
          return state.players[playerId]
        })
        .sort((a, b) => {
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
      const sortedPlayers = [...this.playersByKeepLevel].sort((a, b) => a.name.localeCompare(b.name));
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
    },
    playersInEarlyGroup(): Player[] {
      return this.playersByKeepLevel.filter((player) => {
        if (this.groupView === 'early') {
          return player.isInEarlyGroup;
        }
        return true;
      })
    },
    reinforcementGroup(state) {
      return state.groupView === 'early' ? 'mountainReinforcements' : 'hiveReinforcements';
    },
  },
  actions: {
    add(playerData: Player) {
      this.players[playerData.id] = playerData;
      [...playerData.mountainReinforcements, ...playerData.hiveReinforcements].forEach((playerId) => {
        this.pendingReinfs.push(playerId);
      })
    },
    autoReinforce() {
      const playersReversed = [...this.participantPlayers].filter(({ isInEarlyGroup }) => {
        if (this.groupView === 'early') {
          return isInEarlyGroup;
        }
        return true;
      });
      playersReversed.reverse();

      playersReversed.forEach((player) => {
        const reinforcablePlayers = this.nonReinforcedPlayers.filter(({ name, isInEarlyGroup, keepLevel }) => {
          if (this.groupView === 'early' && !isInEarlyGroup) {
            return false;
          }
          return player.keepLevel - keepLevel >= 1;
        });

        if (player.name.includes('Wolverriny')) {
          debugger;
        }

        const { marches } = player;

        for (let i = 0; i <= reinforcablePlayers.length - 1 && player[this.reinforcementGroup].length < marches; i += 1) {
          const option = reinforcablePlayers[i];
          const reinfPlayer = this.players[option.id];
          reinfPlayer.isReinforced = true;
          player[this.reinforcementGroup].push(option.id);
        }
      })
    },
    clear() {
      this.players = {};
    },
    deletePlayer(playerId: string) {
      const player = this.players[playerId];

      // Un-reinforce players
      [...player.hiveReinforcements, ...player.mountainReinforcements].forEach((playerId) => {
        this.players[playerId].isReinforced = false;
      })

      delete this.players[playerId];
    },
    processPendingReinfs() {
      this.pendingReinfs.forEach((playerId) => {
        this.players[playerId].isReinforced = true;
      })
      this.pendingReinfs = [];
    },
    reinforce(playerId: string, reinfPlayerId: string) {
      this.players[playerId][this.reinforcementGroup].push(reinfPlayerId);
      this.players[reinfPlayerId].isReinforced = true;
    },
    setInEarlyGroup(playerId: string, isInEarlyGroup: boolean) {
      this.players[playerId].isInEarlyGroup = isInEarlyGroup;
    },
    setParticipation(playerId: string, isParticipant: boolean) {
      this.players[playerId].isParticipant = isParticipant;
    },
    unreinforce(playerId: string, reinfPlayerId: string) {
      const player = this.players[playerId];
      const playerIndex = player[this.reinforcementGroup].findIndex((id) => id === reinfPlayerId);
      player[this.reinforcementGroup].splice(playerIndex, 1);
      this.players[reinfPlayerId].isReinforced = false;
    },
    updatePlayer(playerId: string, updates: { keepLevel?: number, name?: string }) {
      this.players[playerId] = {
        ...this.players[playerId],
        ...updates,
      };
    },
    viewGroup(group: 'early' | 'hive') {
      this.groupView = group;
    }
  },
})