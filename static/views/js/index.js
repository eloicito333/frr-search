const form = document.getElementById('search-form')
const formUrl = document.getElementById('search-form-url')
const chromiumBtn = document.getElementById('launch-chromium-btn');
const firefoxBtn = document.getElementById('launch-firefox-btn');

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