var fs = require('fs');
var path = require('path');
var wiredep = require('wiredep');
var pkg = require('./package.json');
var buildConf = require('./build.conf.js');

var files = [];
var js = buildConf.appFiles.js;

var bowerComponents = wiredep({
    devDependencies: true
});

if (bowerComponents) {
    files = files.concat(bowerComponents.js);
}
module.exports = function(config) {
    'use strict';

    config.set({
        autoWatch: true,
        basePath: './',
        frameworks: [
            'mocha',
            'chai',
            'sinon'
        ],
        files: files.concat([
            buildConf.sourceDir.clientDir + '/' + pkg.appName + '/test-helpers/*.js',
            buildConf.sourceDir.clientDir + '/**/*.module.js',
            buildConf.sourceDir.clientDir + '/**/*.js',
            buildConf.sourceDir.clientDir + '/**/*.html',
            buildConf.sourceDir.clientDir + '/**/*.spec.js'
        ]),
        client: {
            mocha: {
                ui: 'bdd'
            }
        },
        exclude: [],
        port: 8180,
        browsers: ['PhantomJS'],
        singleRun: false,
        colors: true,
        logLevel: config.LOG_INFO,
        reporters: ['progress', 'coverage'],
        junitReporter: {
            outputFile: 'build/reports/karma-report.xml'
        },
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-sinon',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'src/**/!(*.spec|*-helper).js': ['coverage']
            //'src/**/{!(*.spec).js,!(test-helpers)/**/*.js}': ['coverage']
        },

        // configure the reporter
        coverageReporter: {
            reporters: [
                {type: 'text'},
                {type: 'lcovonly', dir: buildConf.coverageDir, subdir: buildConf.coverageSubdir},
                {type: 'json', dir: buildConf.coverageDir, subdir: buildConf.coverageSubdir},
                {type: 'cobertura', dir: buildConf.coverageDir, subdir: buildConf.coverageSubdir}
            ]
        },

        ngHtml2JsPreprocessor: {
            moduleName: pkg.appModule,
            cacheIdFromPath: function (filepath) {
                return filepath.replace(buildConf.sourceDir.clientDir + '/', '');
            }
        }
    });
};
