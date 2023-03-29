declare type Player = {
    id: string;
    isParticipant: boolean;
    isReinforced: boolean;
    keepLevel: number;
    marches: number;
    name: string;
    reinforcements: string[];
}

declare type PlayerProperty = 'id' | 'isParticipant' | 'isReinforced' | 'keepLevel' | 'marches' | 'name' | 'reinforcements';