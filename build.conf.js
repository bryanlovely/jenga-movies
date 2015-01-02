var pkg = require('./package.json');

module.exports = {

    sourceDir: {
        rootDir: 'src',
        clientDir: 'src/client',
        imageDir: 'src/client/' + pkg.appName + '/layout/assets',
        fontDir: 'src/client/' + pkg.appName + '/layout/assets/fonts',
        staticDir: 'src/static'
    },
    buildDir: {
        rootDir: 'dist',
        clientDir: 'dist/client',
        imageDir: 'dist/client/assets/images',
        fontDir: 'dist/client/assets/fonts',
        staticDir: 'dist/static'
    },
	demoDir: 'demo',
	nodeModulesFolder: 'node_modules',
	bowerComponentsFolder: 'bower_components',
  coverageSubdir: '.',

	projectName: pkg.name,
	appName: pkg.appName,
	appModule: pkg.appModule,

	staticServerJS: 'src/static/server.js',

    packageJSON: 'package.json',

    bowerJSON: 'bower.json',

	appFiles: {

		// javascript files
        js: ['**/*.module.js', '**/*.js', '!**/*.spec.js'],

		// javascript unit tests
        jsUnit: ['**/*.spec.js'],

        // angular templates & views
        templates: ['**/*.directive.html', '**/*.view.html'],

		// main html file
		html: 'index.html',

		// main less file
		less: '**/' + pkg.appName + '.less',

		// images
        images: ['**/*.gif', '**/*.jpg', '**/*.png', '**/*.ico']
	},

	buildFiles: {

		js: pkg.name + '.js',
		jsMin: pkg.name + '.min.js',
		bower: pkg.name + '.bowerComponents.js',

		css: 'main.css',

		templateCacheURLCallback: function(url) {
			return url.replace('src/client/', '../');
		}
	},

	demoFiles: {
		serverJS: 'demo/server/app.js'
	},

	wdprbowerautobuild: {
		prefixes: ['wdpr-', 'dcl-']
	},

  // Code coverage thresholds
  coverage: {
      thresholds: {
        'statements': 0,
        'branches': 0,
        'lines': 0,
        'functions': 0
      },
      dir: 'coverage'
    },
    complexity: {
        src: ['src/**/*.js'],
        exclude: ['src/**/*-helper.js', 'src/api/**/*', 'src/client/**/test-helpers/*'],
        options: {
            breakOnErrors: true,
            //jsLintXML: 'report.xml',         // create XML JSLint-like report
            //checkstyleXML: 'checkstyle.xml', // create checkstyle report
            errorsOnly: false,               // show only maintainability errors
            cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
            halstead: [8, 13, 20],           // or optionally a single value, like 8
            maintainability: 100,
            hideComplexFunctions: false,     // only display maintainability
            broadcast: false                 // broadcast data over event-bus
        }
    }
};
