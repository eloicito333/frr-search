if (!sessionStorage.getItem('url')) window.location.replace('https://frr-search.up.railway.app/')

const iframe = document.getElementById('iframe-your-search');
const formUrl = document.getElementById('search-form');
const inputUrl = document.getElementById('search-form-url');

const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const searchOnIframe = (url) => {
    const hiddenFormElement = document.createElement('form');
    hiddenFormElement.setAttribute('id', 'hidden-form');
    hiddenFormElement.setAttribute('action', 'https://www.google.ie/gwt/x?u=http://frr-search.up.railway.app');
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

searchOnIframe(sessionStorage.getItem('url'))
sessionStorage.removeItem('url')

formUrl.addEventListener('submit', () => {
    event.preventDefault()
    searchOnIframe(inputUrl.value)
    inputUrl.value = ''
})