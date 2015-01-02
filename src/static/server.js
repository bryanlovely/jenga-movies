console.log('Loading express server...');

var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var express = require('express');
var buildConfig = require('../../build.conf');

var app = express();

app.use('/' + buildConfig.buildDir.clientDir, express.static(buildConfig.buildDir.clientDir));
app.use('/', express.static('./' + buildConfig.buildDir.clientDir));

// app.use(express.static('build/images'));

if (process.env.NODE_ENV === 'dev') {
    app.use('/bower_components',  express.static('bower_components'));
}

app.get('/', function(req, res) {
    res.send('Default Express server response. Perhaps you should run grunt serve --dev or --build');
});

//As a fallback, any route that would otherwise throw a 404 (Not Found) will be given to the
//home page, which will try to decompose the route and use the correct client-side route.
app.use(function(req, res, next) {
    var root = buildConfig.buildDir.clientDir;
    console.log('Falling back to ' + root + '/' + buildConfig.appFiles.html + ' instead of ' + req.url);
    req.url = root + '/' + buildConfig.appFiles.html;
    next();
});

module.exports = app;
