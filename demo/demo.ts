
    import {Translate} from '../src/index';
    const data = {
        bs: {
            order: {
                all: {
                    'en': ""
                },
                b: {
                    'en': "Покупки"
                },
                s: {
                    'en': "Продажи"
                },
            }
        },
        "test": {
            'en' : "Отменить все ордера [bs.order.{bs}]"
        }
    }
    const trl = new Translate(data);

    document.getElementById('content')!.innerHTML = trl.get("test", 'en',  {bs : 'all'}, false, {
        "[bs.order.{bs}]": (key) => {
            return `<b>${key}</b>`
        }
    })