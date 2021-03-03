export interface ITranslationStorage {
    [key: string] : string | ITranslationStorage
}

export class Translate{
    data: ITranslationStorage
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

    get(key: string, lang: string, values? : {[key: string]: string}){
        if(!key) return '';
        const path = key.split('.');
        let v: Record<string, any> = {};
        try{
            v = (path.reduce((a, k) => a[k], this) ||
                (path.length > 1
                    ? path.slice(1).reduce((a, k) => a[k], this.data.common)
                    : path.reduce((a, k) => a?.[k], this.data.common))) as Record<string, any>;
        }
        catch(e){
            return key;
        }

        let res = v?.[lang] || v?.en || key
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
