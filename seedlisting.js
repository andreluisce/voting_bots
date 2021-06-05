const axios = require('axios');

const config = {
    method: 'post',
    url: 'https://seedlisting.com/wp-admin/admin-ajax.php',
    timeout: 5000,
    headers: {
        accept: '*/*',
        'accept-language': 'pt-PT,pt-BR;q=0.9,pt;q=0.8,en-GB;q=0.7,en;q=0.6,en-US;q=0.5',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        'sec-ch-ua-mobile': '?1',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-requested-with': 'XMLHttpRequest',
        cookie: '',
    },
    data: 'action=it_epoll_vote&option_id=12154221640426&poll_id=1190',
};

(async () => {
    let errorCount = 0;
    let success = 0;
    let cookie;

    for (let index = 0; index < 1000; index++) {
        try {
            await axios({
                method: 'get',
                url: 'https://seedlisting.com/enquete/',
            }).then((response) => {
                cookie = response.headers['set-cookie'][0];
            });

            config.headers.cookie = cookie;


            await axios(config)
                .then(function (ss) {
                    if(ss.data.total_opt_vote_count) {
                        success++;
                        console.log('✅ Voted ✅', 'Number Vote', ss.data.total_opt_vote_count, new Date());
                    } else {
                        errorCount++;
                        console.log('🚨 ERROR 🚨', "Site out of air");
                    }
                    
                })
                .catch(function (error) {
                    errorCount++;
                    console.log('🚨 ERROR 🚨', errorCount, error.status);
                });
        } catch (error) {
            continue;
        }
    }

    console.log('success', success);
    console.log('error', errorCount);
})();
