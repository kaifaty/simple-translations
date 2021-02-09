export const translate = {
    "from": {
        "en": "From",
        "ru": "С"
    },
    "to": {
        "en": "To",
        "ru": "На"
    },
    "info": {
        "en": "Info",
        "ru": "Информация"
    },
    "gasEstimated": {
        "en": "Estimated Gas",
        "ru": "Прогноз газа"
    },
    "gasLimit": {
        "en": "Gas limit",
        "ru": "Лимит газа"
    },
    "transactionFee": {
        "en": "Transaction fee",
        "ru": "Комиссия на перевод"
    },
    "slow": {
        "en": "Slow",
        "ru": "Медленный"
    },
    "normal": {
        "en": "Normal",
        "ru": "Нормальный"
    },
    "fast": {
        "en": "Fast",
        "ru": "Быстрый"
    },
    "transactionConfirm": {
        "en": "Transaction confirm",
        "ru": "Подтверждение транзакции"
    },
    "button_confirm": {
        "en": "Confirm",
        "ru": "Подтверждено"
    },
    "button_close": {
        "en": "Close",
        "ru": "Закрыть"
    },
    "lastTransactions": {
        "en": "Last transactions",
        "ru": "Последние транзакции"
    },
    "waitingTransactions": {
        "en": "Transactions to be mined: {value}",
        "ru": "Транзакции для майнинга: {value}"
    },
    "status": {
        "en": "Status",
        "ru": "Статус"
    },
    "confirmations": {
        "en": "Confirmations",
        "ru": "Подтверждений"
    },
    get(key: string, lang: string, values? : {[key: string]: string}){
        let res = this[key]?.[lang] || this[key]?.en || key
        if(values){
            return  res.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m: string, n: string) => {
                return values[n] !== undefined ? values[n] : m;
            });
        }
        return res;
    }
}
