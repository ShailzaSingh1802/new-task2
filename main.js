function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
(function() {
    var res = getCookie('dnmode');
    if (!res) return;
    if (res == 'on') {
        document.getElementsByTagName('body')[0].classList.add('nightview')
    }
})();
document.getElementById('nightday').addEventListener('click', function() {
    if (!document.getElementsByTagName('body')[0]) return false;
    var body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('nightview')) {
        setCookie('dnmode', 'on', 10 * 365);
        body.classList.add('nightview');
    } else {
        body.classList.remove('nightview');
        setCookie('dnmode', 'off', 10 * 365);
    }
});
document.getElementById('gaspop').addEventListener('mouseover', function() {
    if (!document.getElementById('ethgas-form')) return false;
    from = document.getElementById('gaspop');
    e = document.getElementById('ethgas-form');
    e.classList.remove('dialog_hide');
    e.style.top = parseInt(from.offsetTop + from.offsetHeight + 7) + 'px';
    e.style.left = parseInt(from.offsetLeft + from.offsetWidth - (e.offsetWidth / 2)) + 'px';
});
document.getElementById('gaspop').addEventListener('mouseout', function() {
    if (!document.getElementById('ethgas-form')) return false;
    e = document.getElementById('ethgas-form');
    if (e.classList.contains('dialog_hide')) return false;
    e.classList.add('dialog_hide');
});

function openNav() {
    var e = document.getElementById('sitenav');
    if (e.style.width != '' && e.style.width != '0' && e.style.width != '0px') {
        closeNav();
        return;
    }
    e.style.width = '100%';
    document.body.classList.add('noscroll');
}

function closeNav() {
    document.getElementById('sitenav').style.width = '0';
    document.body.classList.remove('noscroll');
}
var lastactive = false;
var lastelem = false;

function closerDialog(event) {
    var inside = lastelem.children[0].contains(event.target);
    var inside1 = lastactive.contains(event.target);
    if (inside || inside1) return;
    lastelem.classList.add('dialog_hide');
    document.removeEventListener('click', closerDialog);
}

function toggleDialog(id, from) {
    if (!document.getElementById(id)) return false;
    lastelem = document.getElementById(id);
    if (!lastelem.classList.contains('dialog_hide')) {
        lastelem.classList.add('dialog_hide');
        document.removeEventListener('click', closerDialog);
        lastactive = false;
        lastid = false;
        return false;
    }
    lastelem.classList.remove('dialog_hide');
    lastactive = from;
    document.addEventListener('click', closerDialog);
}
var langElement = false;
var langFrom = false;

function closeLangExt(event) {
    if (!langElement) return;
    var inside = langElement.contains(event.target);
    var inside1 = langFrom.contains(event.target);
    if (inside || inside1) return;
    closeLang();
}

function closeLang() {
    langElement.classList.add('dialog_hide');
}

function showLang(from) {
    if (!document.getElementById('lang-form')) return false;
    e = document.getElementById('lang-form');
    if (!e.classList.contains('dialog_hide')) {
        e.classList.add('dialog_hide');
        return;
    }
    e.classList.remove('dialog_hide');
    e.style.top = parseInt(from.offsetTop + from.offsetHeight) + 'px';
    e.style.left = parseInt(from.offsetLeft + from.offsetWidth - e.offsetWidth) + 'px';
    langElement = e;
    langFrom = from;
    document.addEventListener('click', closeLangExt);
}
var searchElement = false;
var searchFrom = false;

function closeSearchExt(event) {
    if (!searchElement) return;
    if (!document.getElementsByClassName('msearch')[0]) return false;
    var inside = searchElement.contains(event.target);
    var inside1 = searchFrom.contains(event.target);
    if (inside || inside1) return;
    closeSearch();
}

function closeSearch() {
    if (!searchElement) return;
    searchElement.classList.add('dialog_hide');
    document.body.classList.remove('noscroll');
    document.removeEventListener('click', closeSearchExt);
    searchElement = false;
    document.getElementById('sea1').value = '';
}

function showSearch(id, from) {
    if (!document.getElementById(id)) return false;
    e = document.getElementById(id);
    e.classList.remove('dialog_hide');
    if (from.className == 'msearch') {
        e.style.top = parseInt(from.offsetTop - 5) + 'px';
        e.style.left = parseInt(from.offsetLeft + from.offsetWidth - e.offsetWidth) + 'px';
    } else {
        e.style.top = '0px';
        e.style.left = '0px';
        document.body.classList.add('noscroll');
    }
    searchElement = e;
    searchFrom = from;
    document.addEventListener('click', closeSearchExt);
    document.getElementById('sea1').focus();
}
var scrollElement = false;
var scrollOffset = false;
var scrollOffsetB = false;
var scrollInit = false;

function moveThead() {
    if (!scrollInit) return;
    if (window.pageYOffset < scrollOffset || window.pageYOffset > scrollOffsetB) {
        scrollElement.style.transform = "";
        scrollElement.style.visibility = 'visible';
        return false;
    }
    scrollElement.style.visibility = 'hidden';
    y = window.pageYOffset - scrollOffset - 1;
    scrollElement.style.transform = "translateY(" + y + "px)";
    window.setTimeout(function() {
        scrollElement.style.visibility = 'visible';
    }, 500);
}
window.addEventListener('resize', function() {
    checkTheadScroll();
});

function checkTheadScroll() {
    var t = document.querySelector('.stick');
    if (!t) return;
    var th = t.querySelector('thead');
    if (!th) return;
    lastRow = 0;
    if (t.rows.length > 0 && t.rows[t.rows.length - 1]) {
        lastRow = t.rows[t.rows.length - 1].clientHeight - 20;
    }
    scrollElement = th;
    scrollOffset = t.offsetTop;
    scrollOffsetB = t.offsetTop + t.clientHeight - th.clientHeight - lastRow;
    if (!scrollInit) {
        scrollInit = true;
        document.addEventListener('scroll', moveThead);
    }
    moveThead();
}
document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function() {
        checkTheadScroll();
    }, 3000);
});
for (var i = 0; i < document.querySelectorAll('.linkbox').length; i++) {
    document.querySelectorAll('.linkbox')[i].addEventListener('click', function(event) {
        event.preventDefault();
        return false;
    });
}