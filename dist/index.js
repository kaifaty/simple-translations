export class Translate {
    constructor(data) {
        this.data = {};
        if (data) {
            this.setStorage(data);
        }
    }
    setStorage(data) {
        this.data = data;
    }
    appendStorage(data) {
        Object.keys(data).forEach(key => {
            if (this.data[key]) {
                this.data[key] = Object.assign(Object.assign({}, this.data[key]), data[key]);
            }
            else {
                this.data[key] = data[key];
            }
        });
    }
    _checkPath(path, point = this.data) {
        let res = point;
        for (const v of path) {
            if (res[v] === undefined)
                return null;
            if (typeof res[v] === 'string')
                return null;
            res = res[v];
        }
        return res;
    }
    get(key, lang, values) {
        if (!key)
            return '';
        const path = key.split('.');
        let v = this._checkPath(path);
        if (!v && typeof this.data.common === "object") {
            v = this._checkPath(path, this.data.common)
                || this._checkPath(path.slice(1), this.data.common);
        }
        if (!v) {
            return key;
        }
        let res = (v === null || v === void 0 ? void 0 : v[lang]) || (v === null || v === void 0 ? void 0 : v.en) || key;
        if (typeof res !== 'string') {
            return key;
        }
        res = res.replace(/\[([a-zA-Z0-9_.,=)( ]+)\]/g, (m, n) => {
            return this.get(n, lang, values);
        });
        if (values) {
            return res.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
                return values[n] !== undefined ? values[n] : m;
            });
        }
        return res;
    }
}
