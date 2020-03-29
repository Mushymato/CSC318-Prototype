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
                question: 'What does HISA stand for?',
                choices: ['Health Industry Students of America', 'High Industry Savings Account', 'High Interest Savings of America', 'High Interest Savings Account'],
                correct: 3,
            },
            {
                type: 'Question',
                question: 'How much interest do high interest saving accounts typically offer?',
                choices: ['0.5%', '2.0%', '5.0%', '10.0%'],
                correct: 1,
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
    },
    'Compound Interest': {
        name: 'Compound Interest',
        definition: 'Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.',
        learn: [
            {
                type: 'Video',
                link: 'https://www.youtube.com/embed/Rm6UdfRs3gw'
            },
            {
                type: 'Reading',
                link: 'https://www.investopedia.com/terms/c/compoundinterest.asp'
            }
        ],
        practice: [
            {
                type: 'Question',
                question: 'The addition of interest to the principal sum of a loan or deposit is called _____.',
                choices: ['Simple interest', 'Compound Interest', 'Savings Account', 'Investing Account'],
                correct: 1,
            },
            {
                type: 'Question',
                question: 'With compound interest, the interest in the next period is earned on only the principal amount.',
                choices: ['True', 'False'],
                correct: 1,
            }
        ]
    },
    'Compound Interest': {
        name: 'Mutual Funds',
        definition: 'A mutual fund is a type of investment vehicle consisting of a portfolio of stocks, bonds, or other securities. Mutual funds give small or individual investors access to diversified, professionally managed portfolios at a low price.',
        learn: [
            {
                type: 'Video',
                link: 'https://www.youtube.com/embed/ngfKXvfzC74'
            },
            {
                type: 'Reading',
                link: 'https://www.investopedia.com/terms/m/mutualfund.asp'
            }
        ],
        practice: [
            {
                type: 'Question',
                question: 'A portfolio of stocks, bonds, or other securities is called a ______.',
                choices: ['Exchange-Traded Fund', 'Savings Account', 'Mutual Fund', 'Investing Account'],
                correct: 2,
            },
            {
                type: 'Question',
                question: 'Mutual funds give investors access to diversified portfolios at a low price.',
                choices: ['True', 'False'],
                correct: 0,
            }
        ]
    },
    Dividends: {
        name: 'Dividends',
        definition: 'A dividend is the distribution of a portion of the company\'s earnings, decided and managed by the company’s board of directors, and paid to a class of its shareholders.',
        learn: [
            {
                type: 'Video',
                link: 'https://www.youtube.com/embed/_sPVwmGFAiA'
            },
            {
                type: 'Reading',
                link: 'https://www.investopedia.com/terms/d/dividend.asp'
            }
        ],
        practice: [
            {
                type: 'Question',
                question: 'The distribution of a portion of a company’s earnings is called a _______.',
                choices: ['Stock', 'Exchange-Traded Fund', 'Mutual Fund', 'Dividend'],
                correct: 3,
            },
            {
                type: 'Question',
                question: 'Dividends are managed by shareholders.',
                choices: ['True', 'False'],
                correct: 1,
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

function addExpNext(exp, redir, quiz_idx) {
    let params = getParams(window.location.href);
    if (!params.exp) {
        params.exp = 0;
    }
    params.exp = parseInt(params.exp) + exp;
    params.quiz_idx = quiz_idx;
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
