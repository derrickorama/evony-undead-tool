declare type Player = {
    hiveReinforcements: string[];
    id: string;
    isExcluded: boolean;
    isInEarlyGroup: boolean;
    isNotEmpty: boolean;
    isOnHold: boolean;
    isParticipant: boolean;
    isReinforced: boolean;
    isXxl: boolean;
    keepLevel: number;
    marches: number;
    mountainReinforcements: string[];
    name: string;
    notes: string;
    reinforcements: string[];
}

type ObjectKeys<T> =
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}