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
}

consentimentPopupAccemptBtn.addEventListener('click', () => {
    setCookie('frrsearch@coockieConsentiment', coockieVersion, 60)
    consentimentPopup.close()
    GoogleAnalyticsSetUp()
})

document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('frrsearch@coockieConsentiment') === "v1") {
        GoogleAnalyticsSetUp();
    } else {
        consentimentPopup.showModal();
    }
})

form.addEventListener('submit', event => {
    event.preventDefault()

    sessionStorage.setItem('frr-search@form-action', 'gateway')
    sessionStorage.setItem('frr-search@url', formUrl.value)

    window.location.replace(`http://${window.location.host}/search/`)
})

chromiumBtn.addEventListener('click', () => {
    sessionStorage.setItem('frr-search@form-action', 'chromium')
    if (sessionStorage.getItem('frr-search@url')) sessionStorage.removeItem('frr-search@url')

    window.location.replace(`http://${window.location.host}/search/`)
})

firefoxBtn.addEventListener('click', () => {
    sessionStorage.setItem('frr-search@form-action', 'firefox')
    if (sessionStorage.getItem('frr-search@url')) sessionStorage.removeItem('frr-search@url')

    window.location.replace(`http://${window.location.host}/search/`)
})