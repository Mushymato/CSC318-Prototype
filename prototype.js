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
    const params = getParams(window.location.href);
    if (params.username) {
        $('#username').html(params.username);
    }
    if (params.exp) {
        const lv = Math.floor(params.exp / 100);
        $('#level').html(lv + 1);
        const ex = params.exp - lv * 100;
        $('#expbar').css('--fill', ex + '%');
    }
    if (params.exp > 0) {
        $('.tip').hide();
    }
    $('a').each((i, v) => {
        if ($(v).prop('href')) {
            $(v).prop('href', $(v).prop('href') + encodeQueryData(params));
        }
    })
}

function addExp(exp) {
    let params = getParams(window.location.href);
    if (!params.exp) {
        params.exp = 0;
    }
    params.exp += exp;
    delete params.link;
    window.location.replace("dashboard.html" + encodeQueryData(params));
}

window.onload = () => {
    updateDashboard();
}