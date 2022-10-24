const form = document.getElementById('search-form')
const formUrl = document.getElementById('search-form-url')
const chromiumBtn = document.getElementById('launch-chromium-btn');
const firefoxBtn = document.getElementById('launch-firefox-btn');
const consentimentPopup = document.getElementById('consentiment-popup');
const consentimentPopupAccemptBtn = document.getElementById('consentiment-popup-button');

const coockieVersion = 'v1'

const setCookie = (name, value, exdays) => {
    exdays = exdays || 1;
    let d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * exdays);
    expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

const getCookie = (name) => {
    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        let c = cookies[i].split('=');
        if (c[0] == name) {
            return c[1];
        }
    }
    return undefined;
}

const GoogleAnalyticsSetUp = () => {
    //google analytics set up code
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-GBRZCEEW7Y');
}

consentimentPopupAccemptBtn.addEventListener('click', () => {
    if (getCookie('frr-search@coockieConsentiment')) setCookie('frr-search@coockieConsentiment', '', -1)
    setCookie('frr-search@coockieConsentiment', coockieVersion, 60)
    consentimentPopup.close()
    GoogleAnalyticsSetUp()
})

document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('frr-search@coockieConsentiment') === "v1") {
        GoogleAnalyticsSetUp();
    } else {
        consentimentPopup.showModal();
    }
})

form.addEventListener('submit', event => {
    event.preventDefault()

    sessionStorage.setItem('frr-search@form-action', 'gateway')
    sessionStorage.setItem('frr-search@url', formUrl.value)

    window.location.replace(`${window.location.protocol}//${window.location.host}/search/`)
})

chromiumBtn.addEventListener('click', () => {
    sessionStorage.setItem('frr-search@form-action', 'chromium')
    if (sessionStorage.getItem('frr-search@url')) sessionStorage.removeItem('frr-search@url')

    window.location.replace(`${window.location.protocol}//${window.location.host}/search/`)
})

firefoxBtn.addEventListener('click', () => {
    sessionStorage.setItem('frr-search@form-action', 'firefox')
    if (sessionStorage.getItem('frr-search@url')) sessionStorage.removeItem('frr-search@url')

    window.location.replace(`${window.location.protocol}//${window.location.host}/search/`)
})