import * as fetch from 'node-fetch';

setInterval(async() => {
    await fetch('https://frr-search.herokuapp.com/');
    console.log('App kept self alive')
}, 4.5 * 60 * 1000)