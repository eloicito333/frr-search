const form = document.getElementById('search-form')
const formUrl = document.getElementById('search-form-url')
const chromiumBtn = document.getElementById('launch-chromium-btn');
const firefoxBtn = document.getElementById('launch-firefox-btn');
const consentimentPopup = document.getElementById('popup-modal-coockies');
const consentimentPopupAcceptBtn = document.getElementById('consentiment-popup-button');

const coockieVersion = 'v1.1'

/**
 * Set a cookie with the name and value provided, and expire it in exdays days.
 * @param {string} name The name of the cookie- The name of the cookie.
 * @param {*} value - The value of the cookie.
 * @param {number} exdays - The number of days you want the cookie to last.
 */
const setCookie = (name, value, exdays) => {
    exdays = exdays || 1;
    let d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * exdays);
    expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

/**
 * It returns the value of the cookie with the given name, or undefined if the cookie doesn't exist
 * @param {string} cname The name of the cookie you want to get.
 * @returns The value of the cookie with the name passed in.
 */
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

/**
 * It sets up Google Analytics on the page
 */
const GoogleAnalyticsSetUp = async() => {
    const googleScriptFetchResponse = await fetch('https://www.googletagmanager.com/gtag/js?id=G-GBRZCEEW7Y');
    const googleScriptCode = await googleScriptFetchResponse.text()
    await eval(googleScriptCode)

    //google analytics set up code
    window.dataLayer = window.dataLayer || [];

    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-GBRZCEEW7Y');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(getCookie('frr-search@coockieConsentiment'))
    if (getCookie('frr-search@coockieConsentiment') === coockieVersion) {
        GoogleAnalyticsSetUp();
    } else {
        consentimentPopup.classList.remove('hidden');
    }
})

consentimentPopupAcceptBtn.addEventListener('click', () => {
    if (getCookie('frr-search@coockieConsentiment')) setCookie('frr-search@coockieConsentiment', '', -1)
    setCookie('frr-search@coockieConsentiment', coockieVersion, 60)
    consentimentPopup.classList.add('hidden')
    GoogleAnalyticsSetUp()
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