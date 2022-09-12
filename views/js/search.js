if (!sessionStorage.getItem('frr-search@form-action')) window.location.replace(`http://${window.location.host}`)

const iframe = document.getElementById('iframe-your-search');
const formUrl = document.getElementById('search-form');
const inputUrl = document.getElementById('search-form-url');

const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const searchOnIframe = (url) => {

    const hiddenFormElement = document.createElement('form');
    hiddenFormElement.setAttribute('id', 'hidden-form');
    hiddenFormElement.setAttribute('action', `http://${window.location.host}/get/gateway/`);
    hiddenFormElement.setAttribute('target', 'your-search');
    hiddenFormElement.setAttribute('method', 'POST');

    const hiddenInputElement = document.createElement('input');
    hiddenInputElement.setAttribute('type', 'hidden');
    hiddenInputElement.setAttribute('name', 'url');
    hiddenInputElement.setAttribute('value', url);

    hiddenFormElement.appendChild(hiddenInputElement);

    insertAfter(hiddenFormElement, iframe);

    const hiddenForm = document.querySelector('#hidden-form');
    hiddenForm.submit();
    hiddenForm.remove();
}

if (sessionStorage.getItem('frr-search@form-action') === 'gateway' && sessionStorage.getItem('frr-search@url')) {
    searchOnIframe(sessionStorage.getItem('frr-search@url'))
    sessionStorage.removeItem('frr-search@url')
    sessionStorage.removeItem('frr-search@form-action')

} else if (sessionStorage.getItem('frr-search@form-action') === 'chromium') {
    iframe.src = 'https://replit.com/@EloiBuil2/Chromium-unblocked-1?v=1&embed=true'
    sessionStorage.removeItem('frr-search@form-action')

} else if (sessionStorage.getItem('frr-search@form-action') === 'firefox') {
    iframe.src = 'https://replit.com/@EloiBuil2/firefox-unblocked-1?v=1&embed=true'
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