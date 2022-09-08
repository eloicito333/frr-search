// https here is necesary for some features to work, even if this is going to be behind an SSL-providing reverse proxy.
const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http')
const enforce = require('express-sslify')

dotenv.config()

// you are free to use self-signed certificates here, if you plan to route through an SSL-providing reverse proxy.
/* const ssl = {
    key: fs.readFileSync(path.join(__dirname, '/ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl/server.cert')),
}; */
const server = http.createServer(app);

app.use(enforce.HTTPS())

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

server.listen(process.env.PORT || 8000);