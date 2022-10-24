const createServer = require('@tomphttp/bare-server-node');
const http = require('http');
const nodeStatic = require('node-static');
const { resolve } = require('path');
const fs = require('fs');

const staticDir = resolve(__dirname, 'static');
const viewsDir = resolve(staticDir, 'views');

const bare = createServer('/bare/');
const serve = new nodeStatic.Server(staticDir);

const server = http.createServer();

const sendHTML = (file, res) => {
    console.log('send html fn')
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fs.readFileSync(resolve(viewsDir, file), 'utf-8'));
    res.end();
}

/* const sendJS = (file, res) => {
    console.log('send html fn')
    const jsData = fs.readFileSync(resolve(staticDir, file), 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(jsData);
    res.end();
} */

const fileRequest = (req, res) => {
    let url = req.url
    if (url.length > 1 && url.charAt(url.length - 1) === '/') url = url.substring(0, url.length - 1)
    if (url === '/') {
        sendHTML('index.html', res)
    } else if (url == '/search') {
        sendHTML('search.html', res)
    } else if (url == '/feedback') {
        sendHTML('feedback.html', res)
    } else if (url === '/privacy-policy') {
        sendHTML('privacy-policy.html', res)
    } else {
        serve.serve(req, res)
        console.log('send with node-static')
    }
}

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        fileRequest(req, res)
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req, socket, head)) {
        bare.routeUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen({
    port: process.env.PORT || 8080,
});