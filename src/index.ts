export interface ITranslationStorage {
    [key: string] : string | ITranslationStorage
}
interface TValues {
    [key: string]: string | number | TValues
}

export interface IReplacers {
    [key: string]: (key: string) => string
}

export class Translate{
    data: ITranslationStorage = {};
    variables: TValues | null = null;
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
        replacers?: IReplacers
    ): string{
        if(!key) return '';
        if(!values && this.variables){
            values = {domain: this.variables} as Record<string, any>;
        }
        else if(!values?.domain && this.variables){
            values = {...values, domain: this.variables};
        }
        const path = key.split('.');
        let v: ITranslationStorage | null = this._checkPath(path);

        if(!v && typeof this.data.common === "object") {
            v = this._checkPath(path, this.data.common) || 
            this._checkPath(path.slice(1), this.data.common) ||
            this._checkPath(path.slice(-1), this.data.common)
        }
        if(v === undefined){
            return '';
        }
        let res = v?.[lang] || (v?.en !== undefined ? v?.en : key);
        if(typeof res !== 'string'){
            return '';
        }
        res = res.replace(/\[([a-zA-Z0-9}{_.,=)(]+)\]/g, (m: string, n: string) => {
            n = this._replace(n, replaceToEmpty, values, replacers);
            if(replacers?.[m] !== undefined){
                return replacers?.[m](this.get(n, lang, values, replaceToEmpty, replacers));
            }
            return this.get(n, lang, values, replaceToEmpty);            
        });
        res = this._replace(res, replaceToEmpty, values, replacers);
        return res;
    }
    _replace(
        str: string, 
        replaceToEmpty: boolean = false,
        values? :  TValues, 
        replacers?: IReplacers
    ){
        if(!values) return str;
        return str.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m: string, n: string) => {
            const v = values && getValue(n, values);
                          
            if (v !== undefined) {                        
                if(replacers?.[m]){
                    return replacers?.[m](v)
                }
                return v;
            }
            return replaceToEmpty ? '' : m;
        });
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