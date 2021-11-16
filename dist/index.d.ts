export interface ITranslationStorage {
    [key: string]: string | ITranslationStorage;
}
interface TValues {
    [key: string]: string | number | TValues;
}
export interface IReplacers {
    [key: string]: (key: string) => string;
}
export declare class Translate {
    data: ITranslationStorage;
    variables: TValues | null;
    constructor(data?: ITranslationStorage);
    setStorage(data: ITranslationStorage): void;
    appendStorage(data: ITranslationStorage): void;
    private _checkPath;
    get(key: string, lang: string, values?: TValues, replaceToEmpty?: boolean, replacers?: IReplacers): string;
    _replace(str: string, replaceToEmpty?: boolean, values?: TValues, replacers?: IReplacers): string;
}
export {};
