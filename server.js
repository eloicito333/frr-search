// https here is necesary for some features to work, even if this is going to be behind an SSL-providing reverse proxy.
const https = require('https');
const fs = require('fs');
const path = require('path');
const Corrosion = require('corrosion');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config()

// you are free to use self-signed certificates here, if you plan to route through an SSL-providing reverse proxy.
const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl.cert')),
};
const server = https.createServer(ssl, app);
const proxy = new Corrosion({
    codec: 'xor', // apply basic xor encryption to url parameters in an effort to evade filters. Optional.
    prefix: '/get/' // specify the endpoint (prefix). Optional.
});

proxy.bundleScripts();

app.use(express.static(path.join(__dirname, '/views')));

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

server.on('upgrade', (clientRequest, clientSocket, clientHead) => proxy.upgrade(clientRequest, clientSocket, clientHead));

server.listen(process.env.PORT || 8000);