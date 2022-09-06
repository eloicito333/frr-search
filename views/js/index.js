const form = document.getElementById('search-form')
const formUrl = document.getElementById('search-form-url')

form.addEventListener('submit', event => {
    event.preventDefault()

    if (sessionStorage.getItem('url')) sessionStorage.removeItem('url')
    sessionStorage.setItem('url', formUrl.value)

    window.location.replace('https://jolly-crostata-142b41.netlify.app/search')
})