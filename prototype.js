const data = {
    HISA: {
        name: 'High Interest Savings Account',
        definition: 'High interest savings accounts, as their name suggests, offer a much higher interest rate than what’s available with a regular savings account. Financial institutions are able to offer these rates for a few different reasons:\n<ul>\n<li>Some of the banks are branchless, which cuts down on costs.</li>\n<li>Because transactions can be costly, most customers don\'t use these accounts for daily activity, so from the bank\'s end there aren\'t many transactions to process (which also keeps costs low).</li>\n<li>Banks offer high interest rates, in order to acquire new customers.</li>\n</ul>',
        learn: [
            {
                type: 'Video',
                link: 'https://www.youtube.com/embed/8edPzh71RIQ'
            },
            {
                type: 'Reading',
                link: 'https://en.wikipedia.org/wiki/Interest'
            }
        ],
        practice: [
            {
                type: 'Question',
                question: 'How much interest do high interest saving accounts typically offer?',
                choices: ['0.5%', '2.0%', '5.0%', '10.0%'],
                correct: 1
            }
        ]
    },
    ETF: {
        name: 'Exchange-Traded Fund',
        definition: 'An exchange-traded fund (ETF) is an investment fund traded on stock exchanges, much like stocks. An ETF holds assets such as stocks, commodities, or bonds and generally operates with an arbitrage mechanism designed to keep it trading close to its net asset value, although deviations can occasionally occur.',
        learn: [
            {
                type: 'Video',
                link: 'https://www.youtube.com/embed/OwpFBi-jZVg'
            },
            {
                type: 'Reading',
                link: 'https://en.wikipedia.org/wiki/Exchange-traded_fund'
            }
        ],
        practice: [
            {
                type: 'Question',
                question: 'What does ETF stand for?',
                choices: ['Exchange traded fund', 'Exchange terminal fund', 'Export terminal factorial', 'Export takeup fund'],
                correct: 0
            }
        ]
    }
}

function getParams(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data) {
        if (d) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    }
    if (ret.length > 0) {
        return '?' + ret.join('&');
    } else {
        return '';
    }
}

function updateDashboard() {
    const expPerLvl = 25;
    const params = getParams(window.location.href);
    if (params.username) {
        $('#username').html(params.username);
    }
    if (params.exp) {
        const lv = Math.floor(params.exp / expPerLvl);
        $('#level').html(lv + 1);
        const ex = params.exp - lv * expPerLvl;
        $('#expbar').css('--fill', ex + '%');
    }
    updateLinks(params);
}

function updateLinks(params) {
    $('a').each((i, v) => {
        if ($(v).prop('href')) {
            $(v).prop('href', $(v).prop('href') + encodeQueryData(params));
        }
    });
}

task_map = {
    'learn_definition.html': 't1',
    'practice.html': 't2',
    'friend_profile': 't3'
}

function addExp(exp, redir) {
    let params = getParams(window.location.href);
    if (!params.exp) {
        params.exp = 0;
    }
    params.exp = parseInt(params.exp) + exp;
    delete params.link;
    if (redir in task_map) {
        if (!params.tasks) {
            params.tasks = '';
        }
        if (!params.tasks.includes(task_map[redir])) {
            params.tasks += task_map[redir];
        }
    }
    window.location.replace(redir + encodeQueryData(params));
}

window.onload = () => {
    updateDashboard();
}
