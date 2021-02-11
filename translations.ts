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
    "button_connectWallet": {
        "en": "Connect wallet",
        "ru": "Подключить кошелек"
    },
    "button_disconnectWallet": {
        "en": "Disconnect wallet",
        "ru": "Отсоединить кошелек"
    },
    "button_close": {
        "en": "Close",
        "ru": "Закрыть"
    },
    "button_back": {
        "en": "Back",
        "ru": "Назад"
    },
    "button_connect": {
        "en": "Connect",
        "ru": "Подключить"
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
    "privateKeyAttention": {
        "en": "This is not a recommended way to access your wallet. Due to confidential information, these options should only be used in clean system and browser without any extensions by experienced users.",
        "ru": "Это нерекомендуемый способ доступа к вашему кошельку. Из-за конфиденциальной информации эти параметры должны использоваться только в чистой системе и браузере без каких-либо расширений опытными пользователями."
    },
    "privateKey": {
        "en": "Private key",
        "ru": "Приватный ключ"
    },
    "privateKey_placeholder": {
        "en": "Enter your private key",
        "ru": "Введите ваш приватный ключ"
    },
    "button_save": {
        "en": "Save",
        "ru": "Сохранить"
    },
    "keystore": {
        "en": "Keystore file",
        "ru": "Файл кeystore"
    },
    "password": {
        "en": "Password",
        "ru": "Пароль"
    },
    "password_placeholder": {
        "en": "Enter password",
        "ru": "Введите пароль"
    },
    "choseFile": {
        "en": "Choose file",
        "ru": "Выбрать файл"
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
