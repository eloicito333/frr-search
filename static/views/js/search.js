if (!sessionStorage.getItem('frr-search@form-action')) window.location.replace(`http://${window.location.host}`)

const iframe = document.getElementById('iframe-your-search');
const loadingFrame = document.getElementById('loading-frame');
const formUrl = document.getElementById('search-form');
const inputUrl = document.getElementById('search-form-url');

const replitURLs = {
    chromium: "https://replit.com/@EloiBuil2/Chromium-unblocked-1?v=1&embed=true",
    firefox: "https://replit.com/@EloiBuil2/firefox-unblocked-1?v=1&embed=true"
}

//custom event listener --> iframe url change


const iframeStateChangeController = (iframe, loadCallback, reloadCallback, changedCallback) => {
    if (!changedCallback) changedCallback = reloadCallback
    let lastDispatched = null;

    const dispatchChange = () => {
        const newHref = iframe.contentWindow.location.href;

        if (newHref === lastDispatched) {
            reloadCallback(newHref)
            return;
        }
        changedCallback(newHref);
        lastDispatched = newHref;
    };

    const unloadHandler = () => {
        setTimeout(dispatchChange, 0);
    };

    const attachUnload = () => {
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
    }

    iframe.addEventListener("load", () => {
        attachUnload();
        // Just in case the change wasn't dispatched during the unload event...
        dispatchChange();
        loadCallback(lastDispatched);
    });
    attachUnload();
}

// custom event end

const handleIframeSearh = () => {

}

const isUrl = (val = '') => {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

const searchOnIframe = (Url) => {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = Url.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        iframe.src = `//${window.location.host}${__uv$config.prefix}${__uv$config.encodeUrl(url)}`;
        // ${window.location.protocol == "https:" ? "https://" : ""}
        // __uv$config.prefix + __uv$config.encodeUrl(url)
    })
}

/* const formatRelpIframe = () => {
    const iframeContent = iframe.contentWindow
    iframe.classList.add('relp')
    iframe.addEventListener('load', (e) => {
        console.log('load event')
        iframeContent.document.querySelector("#main-content > div > div > div > div > div.css-8itwiz > div.css-lsneq1").click()
        loadingFrame.classList.add('hide')

    });
} */

iframeStateChangeController(iframe, () => {
        if (iframe.classList.contains('relp')) {
            const iframeContent = iframe.contentWindow
            iframeContent.document.querySelector("#main-content > div > div > div > div > div.css-8itwiz > div.css-lsneq1").click()
        } else {}
        loadingFrame.classList.add('hide')
    },
    () => {
        loadingFrame.classList.remove('hide')
    },
    (newHref) => {
        loadingFrame.classList.remove('hide')
        const isRelp = iframe.classList.contains('relp') ? true : false
        if (newHref !== `${window.location.protocol}//${window.location.host}${__uv$config.prefix}${__uv$config.encodeUrl(replitURLs.chromium)}` && newHref !== `${window.location.protocol}//${window.location.host}${__uv$config.prefix}${__uv$config.encodeUrl(replitURLs.firefox)}`) {
            if (isRelp) iframe.classList.remove('relp')
        } else {
            if (!isRelp) iframe.classList.add('relp');
        }
    })

if (sessionStorage.getItem('frr-search@form-action') === 'gateway' && sessionStorage.getItem('frr-search@url')) {
    searchOnIframe(sessionStorage.getItem('frr-search@url'))
    sessionStorage.removeItem('frr-search@url')
    sessionStorage.removeItem('frr-search@form-action')

} else if (sessionStorage.getItem('frr-search@form-action') === 'chromium') {
    searchOnIframe(replitURLs.chromium)
    iframe.classList.add('relp')
    sessionStorage.removeItem('frr-search@form-action')

} else if (sessionStorage.getItem('frr-search@form-action') === 'firefox') {
    searchOnIframe(replitURLs.firefox)
    iframe.classList.add('relp')
    sessionStorage.removeItem('frr-search@form-action')

} else window.location.replace(`http://${window.location.host}`)

formUrl.addEventListener('submit', (event) => {
    event.preventDefault()
    searchOnIframe(inputUrl.value)
    inputUrl.value = ''

    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    openSearchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    form.classList.remove("active");
    cancelBtn.style.color = "#ff3d00";
})