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
        $(v).prop('href', $(v).prop('href') + encodeQueryData(params));
    })
}

function addExp(exp) {
    let params = getParams(window.location.href);
    if (!params.exp) {
        params.exp = 0;
    }
    params.exp += exp;
    window.location.replace("dashboard.html" + encodeQueryData(params));
}

window.onload = () => {
    updateDashboard();
}