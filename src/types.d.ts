declare type Player = {
    hiveReinforcements: string[];
    id: string;
    isInEarlyGroup: boolean;
    isParticipant: boolean;
    isReinforced: boolean;
    keepLevel: number;
    marches: number;
    mountainReinforcements: string[];
    name: string;
    reinforcements: string[];
}

declare type PlayerProperty = 'id' | 'isParticipant' | 'isReinforced' | 'keepLevel' | 'marches' | 'name' | 'reinforcements';