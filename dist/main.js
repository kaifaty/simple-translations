export class Translate {
    constructor(data) {
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
    get(key, lang, values) {
        if (!key)
            return '';
        const path = key.split('.');
        let v = {};
        try {
            v = (path.reduce((a, k) => a[k], this.data) ||
                (path.length > 1
                    ? path.slice(1).reduce((a, k) => a[k], this.data.common)
                    : path.reduce((a, k) => a === null || a === void 0 ? void 0 : a[k], this.data.common)));
        }
        catch (e) {
            return key;
        }
        let res = (v === null || v === void 0 ? void 0 : v[lang]) || (v === null || v === void 0 ? void 0 : v.en) || key;
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
