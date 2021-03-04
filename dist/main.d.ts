export interface ITranslationStorage {
    [key: string]: string | ITranslationStorage;
}
export declare class Translate {
    data: ITranslationStorage;
    constructor(data?: ITranslationStorage);
    setStorage(data: ITranslationStorage): void;
    appendStorage(data: ITranslationStorage): void;
    get(key: string, lang: string, values?: {
        [key: string]: string;
    }): any;
}
