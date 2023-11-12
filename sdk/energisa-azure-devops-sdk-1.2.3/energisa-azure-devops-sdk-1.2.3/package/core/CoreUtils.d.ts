export declare function asyncFilter<T>(arr: T[], predicate: (x: T) => Promise<boolean>): Promise<T[]>;
export declare function groupBy<T>(list: T[], keyGetter: (value: T) => string): Map<string, T[]>;
export declare const distinct: <T>(value: T, index: number, self: T[]) => boolean;
export declare const distinctBy: <T>(array: T[], key: keyof T) => T[];
export declare const isDefined: <T>(item: T | undefined) => item is T;
