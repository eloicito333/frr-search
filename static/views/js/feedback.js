const feedbackForm = document.getElementById('feedback-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const subjectInput = document.getElementById('subject')
const commentInput = document.getElementById('comment')
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

feedbackForm.addEventListener('submit', (event) => {
    const info = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        comment: commentInput.value
    }
    event.preventDefault()
    emailjs.send('service_35xlvu9', 'template_59xb3py', info, 'm_NLd4Ivpm-aCOYbB')
        .then((res) => {
            if (res.status === 200) {
                alert(`Feedback sent successfully!\nThanks for helping to improve this website ${nameInput.value} :)`)
            } else {
                alert(`Something went wrong :(\nAn error ocurred while sending your email`)
            }
            nameInput.value = '';
            emailInput.value = '';
            subjectInput.value = '';
            commentInput.value = '';
        })
})