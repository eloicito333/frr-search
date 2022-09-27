const feedbackForm = document.getElementById('feedback-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const subjectInput = document.getElementById('subject')
const commentInput = document.getElementById('comment')
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