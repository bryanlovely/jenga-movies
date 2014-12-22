var pkg = require('./package.json');

module.exports = {

	sourceDir: 'src/client',
	buildDir: 'dist',
	demoDir: 'demo',
	nodeModulesFolder: "node_modules",
	bowerComponentsFolder: "bower_components",

	projectName: pkg.name,
	appName: pkg.appName,
	appModule: pkg.appModule,

	staticServerJS: 'src/static/server.js',
	serverJS: 'src/server/server.js',


	appFiles: {

		// javascript files
		js: [ '**/*.module.js', '**/*.js', '!**/*.spec.js' ],

		// javascript unit tests
		jsUnit: [ '**/*.spec.js' ],

		// angular templates
		templates: [ '**/*.directive.html', '**/*.html' ],

		// main html file
		html: 'index.html',

		// main less file
		less: pkg.appName + '/main.less',

		// images
		images: [ '**/*.gif', '**/*.jpg', '**/*.png', '**/*.ico']
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
	}

};
