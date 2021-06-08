export interface ITranslationStorage {
    [key: string] : string | ITranslationStorage
}
interface TValues {
    [key: string]: string | number | TValues
}
export class Translate{
    data: ITranslationStorage = {}
    constructor(data?: ITranslationStorage) {
        if(data){
            this.setStorage(data);
        }
    }
    setStorage(data: ITranslationStorage){
        this.data = data;
    }
    appendStorage(data: ITranslationStorage){
        Object.keys(data).forEach(key => {
            if(this.data[key]){
                this.data[key] = {
                    ...(this.data[key] as Record<string, ITranslationStorage>),
                    ...(data[key] as Record<string, ITranslationStorage>)
                }
            }
            else{
                this.data[key] = data[key];
            }
        })
    }

    private _checkPath(path: string[], point: ITranslationStorage = this.data): ITranslationStorage | null{
        let res: ITranslationStorage = point;
        for(const v of path){
            if(res[v] === undefined) return null;
            if(typeof res[v] === 'string') return null;
            res = res[v] as ITranslationStorage;
        }
        return res;
    }
    get(key: string, 
        lang: string, 
        values? :  TValues,
        replaceToEmpty: boolean = false,
    ): string{
        if(!key) return '';
        const path = key.split('.');
        let v: ITranslationStorage | null = this._checkPath(path);

        if(!v && typeof this.data.common === "object") {
            v = this._checkPath(path, this.data.common) 
              || this._checkPath(path.slice(1), this.data.common)
        }
        if(!v){
            return key;
        }

        let res = v?.[lang] || v?.en || key;
        if(typeof res !== 'string'){
            return key;
        }
        if(values){
            res = res.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m: string, n: string) => {
                const v = getValue(n, values);
                if (v !== undefined) {
                    return v;
                }
                return replaceToEmpty ? '' : m;
            });
        }
        res = res.replace(/\[([a-zA-Z0-9_.,=)(]+)\]/g, (m: string, n: string) => {
            return this.get(n, lang, values);
        });
        return res;
    }
}

function getValue(key: string, values: TValues): string | undefined{
    const path: string[] = key.split('.');
    let v: string | number | TValues = values;
    for(const subkey of path){
        v = v[subkey];
        if(typeof v !== 'object') break;
    }
    if(v === undefined) return undefined;
    return v.toString();
}