import { defineStore } from 'pinia';
import { Player } from 'models/Player';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    groupView: 'hive' as 'early' | 'hive',
    hideNonParticipants: true,
    loadErrors: [] as string[],
    players: {} as { [playerId: string]: Player },
    pendingReinfs: [] as { playerId: string; reinfPlayerId: string }[],
  }),
  getters: {
    hasPlayers(state) {
      return Object.keys(state.players).length > 0;
    },
    nonReinforcedPlayers(): Player[] {
      return this.playersByName.filter((player) => !player.isReinforced);
    },
    participantPlayers(): Player[] {
      return this.playersByKeepLevel.filter(({ isParticipant }) => isParticipant);
    },
    playersByKeepLevel(state) {
      const sortedPlayers = Object.keys(state.players)
        .map((playerId) => state.players[playerId])
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
      });
    },
    reinforcementGroup(state) {
      return state.groupView === 'early' ? 'mountainReinforcements' : 'hiveReinforcements';
    },
    reinforcements(state) {
      const players: { [playerId: string]: string } = {};
      Object.values(state.players).forEach((player) => {
        [...player.hiveReinforcements, ...player.mountainReinforcements].forEach((reinfPlayerId) => {
          players[reinfPlayerId] = player.id;
        });
      });
      return players;
    }
  },
  actions: {
    add(playerData: Omit<Player, 'isReinforced' | 'reinforcedBy'>) {
      this.players[playerData.id] = new Player(playerData);
      [...playerData.mountainReinforcements, ...playerData.hiveReinforcements].forEach((playerId) => {
        this.pendingReinfs.push({
          playerId: playerData.id,
          reinfPlayerId: playerId,
        });
      });
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
        const reinforcablePlayers = this.nonReinforcedPlayers.filter(({ isInEarlyGroup, keepLevel }) => {
          if (this.groupView === 'early' && !isInEarlyGroup) {
            return false;
          }
          return player.keepLevel - keepLevel >= 1;
        });

        const { marches } = player;

        for (let i = 0; i <= reinforcablePlayers.length - 1 && player[this.reinforcementGroup].length < marches; i += 1) {
          const option = reinforcablePlayers[i];
          player[this.reinforcementGroup].push(option.id);
        }
      });
    },
    clear() {
      this.players = {};
    },
    deletePlayer(playerId: string) {
      delete this.players[playerId];
    },
    reinforce(playerId: string, reinfPlayerId: string) {
      this.players[playerId][this.reinforcementGroup].push(reinfPlayerId);
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
    },
    updatePlayer(playerId: string, updates: Omit<Player, 'isReinforced' | 'reinforcedBy'>) {
      const player = this.players[playerId];
      const isNowExcluded = updates.isExcluded === true && player.isExcluded === false || updates.isOnHold === true && player.isOnHold === false;

      if (isNowExcluded) {
        player.hiveReinforcements = [];
        player.mountainReinforcements = [];
      }

      if (updates.isInEarlyGroup !== player.isInEarlyGroup) {
        // Switch to mode you switched the person to
        this.groupView = updates.isInEarlyGroup ? 'early' : 'hive';
      }

      if (!updates.isInEarlyGroup) {
        // Remove any reinforced players if player is not in the early group
        player.mountainReinforcements = [];
      }

      this.players[playerId].update(updates);
    },
    viewGroup(group: 'early' | 'hive') {
      this.groupView = group;
    }
  },
});