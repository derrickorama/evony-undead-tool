import { storeToRefs } from "pinia";
import { usePlayerStore } from "stores/player";

export class Player {
  hiveReinforcements: string[] = [];
  id = '';
  isExcluded = false;
  isInEarlyGroup = false;
  isNotBubbled = false;
  isNotEmpty = false;
  isOnHold = false;
  isParticipant = false;
  isXxl = false;
  keepLevel = 1;
  marches = 1;
  mountainReinforcements: string[] = [];
  name = '';
  notes = '';

  constructor(playerData: Omit<Player, 'isReinforced' | 'reinforcedBy'>) {
    this.update(playerData);
  }

  get isReinforced() {
    return this.isXxl || this.isExcluded || this.isNotBubbled || this.isOnHold || this.reinforcedBy;
  }

  get reinforcedBy() {
    const { players, reinforcements } = storeToRefs(usePlayerStore());
    const reinforcerId = reinforcements.value[this.id];
    return players.value[reinforcerId] || null;
  }

  update(playerData: Omit<Player, 'isReinforced' | 'reinforcedBy'>) {
    for (const [key, value] of Object.entries(playerData)) {
      this[key] = value;
    }
  }
}