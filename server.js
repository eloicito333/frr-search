// https here is necesary for some features to work, even if this is going to be behind an SSL-providing reverse proxy.
const path = require('path');
const express = require('express');
const app = express();
const Corrosion = require('corrosion');
const dotenv = require('dotenv');

dotenv.config()

// you are free to use self-signed certificates here, if you plan to route through an SSL-providing reverse proxy.
/* const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl/server.cert')),
}; */

const denyHTTPS = (req, res, next) => {
    if (req.secure && req.get('x-forwarded-proto') === 'https') {
        return res.redirect(`http://${req.get('host')}${req.url}`);
    }
    next();
}

app.use(denyHTTPS);
app.use(express.static(path.join(__dirname, '/views')));

const proxy = new Corrosion({
    codec: 'xor', // apply basic xor encryption to url parameters in an effort to evade filters. Optional.
    prefix: '/get/', // specify the endpoint (prefix). Optional.
    title: 'Gataway',
    ssl: true
});

proxy.bundleScripts();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/search.html'));
})

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/feedback.html'));
})

app.get(/\/get\/*/, (req, res) => {
    return proxy.request(req, res);
});

app.post(/\/get\/*/, (req, res) => {
    return proxy.request(req, res);
});

app.on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead));

app.listen(process.env.PORT || 8080, () => console.log(`Server running at port: ${process.env.PORT}`));

require('./keep-alive')