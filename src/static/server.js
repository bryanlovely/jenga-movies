/*jshint node:true*/
'use strict';

var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var httpProxy = require('http-proxy');
var livereload = require('connect-livereload');
// TODO Replace by logging building block
var logger = require('morgan');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var port = pkg.server.static.port;

var apiProxy = httpProxy.createProxyServer({
    target: 'http://localhost:8181'
});
var app = express();
// TODO Replace by your context path
var baseUrl = '/base';
var baseApiUrl = '/base-api/*';

app.use(logger('dev'));

app.use(cookieParser());

if (process.env.NODE_ENV === 'dev') {
    // app.use(livereload());

    app.get(baseUrl + '(/*)?', function(req, res) {
        res.sendfile('dist/index.html');
    });

    app.use(
        '/bower_components',
        express.static('bower_components')
    );

    app.use(
        express.static('dist')
    );

    app.use('/', function(req, res) {
        res.sendfile('dist/index.html');
    });

    //As a fallback, any route that would otherwise throw a 404 (Not Found) will be given to the
    //home page, which will try to decompose the route and use the correct client-side route.
    app.use(function(req, res, next) {
        var root = 'build';
        console.log('Falling back to ' + root + '/index.html instead of ' + req.url);
        req.url = '/build/index.html';
        next();
    });


} else if (process.env.NODE_ENV === 'stage') {
    app.get(baseUrl + '(/*)?', function(req, res) {
        res.sendfile('dist/index.html');
    });

    app.use('/media', express.static('dist/media'));

} else {
    app.get(baseUrl + '(/*)?', function(req, res) {
        res.sendfile('dist/index.html');
    });

    app.use('/media', express.static('dist/media'));
}

app.get(baseApiUrl, proxy);
app.post(baseApiUrl, proxy);
app.put(baseApiUrl, proxy);
app.delete(baseApiUrl, proxy);

function proxy(req, res, next) {
    apiProxy.web(req, res);
}

apiProxy.on('error', function(err) {
    console.warn(err);
});

module.exports = app;
