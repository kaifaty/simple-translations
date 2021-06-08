export interface ITranslationStorage {
    [key: string]: string | ITranslationStorage;
}
interface TValues {
    [key: string]: string | number | TValues;
}
export declare class Translate {
    data: ITranslationStorage;
    constructor(data?: ITranslationStorage);
    setStorage(data: ITranslationStorage): void;
    appendStorage(data: ITranslationStorage): void;
    private _checkPath;
    get(key: string, lang: string, values?: TValues, replaceToEmpty?: boolean): string;
}
export {};
