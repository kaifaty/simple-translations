export interface ITranslationStorage {
    [key: string] : string | ITranslationStorage
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
    get(key: string, lang: string, values? : {[key: string]: string}): string{
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
        res = res.replace(/\[([a-zA-Z0-9_.,=)( ]+)\]/g, (m: string, n: string) => {
            return this.get(n, lang, values);
        });
        if(values){
            return res.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m: string, n: string) => {
                return values[n] !== undefined ? values[n] : m;
            });
        }
        return res;
    }
}
