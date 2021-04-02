export interface ITranslationStorage {
    [key: string]: string | ITranslationStorage;
}
export declare class Translate {
    lang: string;
    data: ITranslationStorage;
    constructor(data?: ITranslationStorage);
    setStorage(data: ITranslationStorage): void;
    appendStorage(data: ITranslationStorage): void;
    private _checkPath;
    get(key: string, lang: string, values?: {
        [key: string]: string;
    }): string;
}
