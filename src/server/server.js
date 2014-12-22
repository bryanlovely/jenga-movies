console.log('Loading express server...');

var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var express = require('express');
var app = express();

app.use('/dist', express.static('dist'));

app.use('/', express.static('./dist'));

app.use(express.static('demo'));
app.use(express.static('dist/images'));

// if (process.env.NODE_ENV === 'dev') {
    app.use('/bower_components',  express.static('bower_components'));
// }

app.get('/', function(req, res) {
    res.send('Default Express server response. Perhaps you should run grunt serve --dev or --build');
});

//As a fallback, any route that would otherwise throw a 404 (Not Found) will be given to the
//home page, which will try to decompose the route and use the correct client-side route.
app.use(function(req, res, next) {
    var root = 'dist';
    console.log('Falling back to ' + root + '/index.html instead of ' + req.url);
    req.url = '/dist/index.html';
    next();
});

module.exports = app;
