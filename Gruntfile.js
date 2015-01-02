// [jwarden 9.12.2014] TODO: implement grunt-newer; some file lists are easier than others.
// [jwarden 9.12.2014] TODO: concurrency
// concurrent: {
//     minify: {
//         tasks: [
//             'cssmin:optimize',
//             'uglify:optimize',
//             'imagemin:optimize'
//         ]
//     }
// }
// [jwarden 9.12.2014] TODO: need to improve on imagemin; it's png is ok, but jpeg is pathetic. Need to use
// the bash script Matt pointed me too + up the PNG level + verify GIF/SVG attachments. May use imagemin as
// intermediate step until its ready.
// [jwarden 9.12.2014] TODO: load grunt tasks
// https://github.com/sindresorhus/load-grunt-tasks
// [jwarden 12.12.2014] uncss

module.exports = function (grunt) {
  'use strict';

  var buildConfig = require('./build.conf.js');

  // Un-comment to display the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    'ngtemplates': 'grunt-angular-templates',
    'coverage': 'grunt-istanbul-coverage',
    'complexity': 'grunt-complexity'
  });
  var bowerClasses = [];
  bowerClasses = require('wiredep')().js;

  var bowerCss = [];
  bowerCss = require('wiredep')().css;

  var tasks = {
    buildConfig: buildConfig,

    env : {
        options: {
            STATIC_ROOT: __dirname + '/dist/client'
        },
        build: {
            NODE_ENV: 'build'
        },
        dev: {
            NODE_ENV: 'dev'
        },
        library: {
            NODE_ENV: 'library'
        }
    },

    // Checks your JavaScript doesn't have common errors defined by the rules in .jshintrc
    jshint: {
      options: {
        force: true,
        jshintrc: '.jshintrc'
      },

      src: {
        expand: true,
        cwd: buildConfig.sourceDir.clientDir,
        src: buildConfig.appFiles.js.concat(buildConfig.appFiles.jsUnit)
      }
    },

    // Checks your JavaScript code style matches the rules in .jscsrc
    jscs: {
      options: {
        force: true,
        config: '.jscsrc'
      },
      src: {
        expand: true,
        cwd: buildConfig.sourceDir.clientDir,
        src: buildConfig.appFiles.js.concat(buildConfig.appFiles.jsUnit)
      }
    },

    // Runs unit tests
    karma: {
      test: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    // Code coverage thresholds
    coverage: {
      options: {
        thresholds: buildConfig.coverage.thresholds,
        dir: buildConfig.coverage.dir
      }
    },

    complexity: {
      generic: buildConfig.complexity
    },

    // Cleans up the build folders to have a nice, fresh, new build
    clean: {
      all: {
        src: buildConfig.buildDir.rootDir
      }
    },

    // // copies files from development to the build directory
    copy: {
      dev: {
        expand: true,
        cwd: buildConfig.sourceDir.clientDir,
        src: buildConfig.appFiles.js.concat(buildConfig.appFiles.templates, buildConfig.appFiles.html),
        dest: buildConfig.buildDir.clientDir
      },

      prod: {
        expand: false,
        flatten: false,
        cwd: '.',
        src: buildConfig.sourceDir.clientDir + '/' + buildConfig.appFiles.html,
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.appFiles.html
      },

      static: {
          expand: true,
          flatten: false,
          cwd: buildConfig.sourceDir.staticDir,
          src: '*.js',
          dest: buildConfig.buildDir.staticDir
      },

      images: {
          expand: true,
          flatten: false,
          cwd: buildConfig.sourceDir.imageDir,
          src: buildConfig.appFiles.images,
          dest: buildConfig.buildDir.imageDir + '/'
      },

      fonts: {
          expand: true,
          flatten: false,
          cwd: buildConfig.sourceDir.fontDir,
          src: '**',
          dest: buildConfig.buildDir.fontDir  + '/'
      },

      nodeModules: {
          expand: true,
          flatten: false,
          cwd: buildConfig.nodeModulesFolder,
          src: Object.keys(require('./package.json').dependencies).map(function(k, v) { return k + '/**/*'; }),
          dest: buildConfig.buildDir.rootDir + '/' + buildConfig.nodeModulesFolder
      },

      packageJSON:  {
          expand: false,
          flatten: false,
          cwd: '.',
          src: buildConfig.packageJSON,
          dest: buildConfig.buildDir.rootDir +  '/' + buildConfig.packageJSON
      },

      bowerJSON: {
          expand: false,
          flatten: false,
          cwd: '.',
          src: buildConfig.bowerJSON,
          dest: buildConfig.buildDir.rootDir +  '/' + buildConfig.bowerJSON
      }
    },

    // // converts your many LESS files to 1 optimized CSS file for much speed
    less: {

      dev: {
        files: {
          '<%= buildConfig.buildDir.clientDir + "/" + buildConfig.buildFiles.css %>': buildConfig.sourceDir.clientDir + '/' + buildConfig.appFiles.less
        }
      },

      // TODO: verify cleancss is still in there
      // TODO: csso, minifiycss
      library: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          '<%= buildConfig.buildDir.clientDir + "/" + buildConfig.buildFiles.css %>': buildConfig.sourceDir.clientDir + '/' + buildConfig.appFiles.less
        }
      }
    },
    // Parses CSS and adds vendor-prefixed CSS properties
    autoprefixer: {
      options: {
        map: false
      },
      prod: {
        files: [
          {
            expand: true,
            cwd: buildConfig.buildDir.clientDir,
            src: '{,*/}*.css',
            dest: buildConfig.buildDir.clientDir
          }
        ]
      }
    },

    // makes sure your Angular code can be written pretty, yet continue working when you uglify it
    ngAnnotate: {

      options: {
        and: true,
        singleQuotes: true
      },

      prod: {
        expand: false,
        cwd: '.',
        src: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js,
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js
      }
    },

    // // searchs for wdpr and dcl bower components and replace their templateUrls
//     wdprBowerAutoBuild: {
//
//       dev: {
//         options: {
//           prefixes: buildConfig.wdprbowerautobuild.prefixes,
//           bowerDirectory: 'bower_components'
//         }
//       }
//
//     },

    // // takes many JavaScript files and combines them into 1 to reduce HTTP requests for much speed
    concat: {

      library: {
        expand: false,
        cwd: '.',
        src: buildConfig.appFiles.js.map(function (item) {
          if (item.charAt(0) != '!') {
            return buildConfig.sourceDir.clientDir + '/' + item;
          }
          else {
            return '!' + buildConfig.sourceDir.clientDir + '/' + item.substring(1, item.length);
          }
        }),
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js
      },

      bower: {
        src: bowerClasses,
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.bower
      },

      css:{
          src: bowerCss,
          dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.bowerCss
      }
    },

    // // Minifies your JavaScript files to save on file size
    uglify: {
      library: {
        cwd: '.',
        src: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js,
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.jsMin
      },

      prod: {
        files: [
          {
            cwd: '.',
            src: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js,
            dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js
          },

          {
            cwd: '.',
            src: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.bower,
            dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.bower
          }
        ]
      }

    },

    // takes Angular HTML templates, shoves into JavaScript for much speed
    ngtemplates: {
      prod: {
        options: {
          module: buildConfig.appModule,
          standalone: false,
          append: true,
          htmlmin: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeCommentsFromCDATA: true,
            removeOptionalTags: true
          },
          url: buildConfig.buildFiles.templateCacheURLCallback
        },
        cwd: buildConfig.sourceDir.clientDir,
        src: [buildConfig.appFiles.templates, '!' + buildConfig.appFiles.html],
        dest: buildConfig.buildDir.clientDir + '/' + buildConfig.buildFiles.js
        // dist/client/
      }
    },

    // cache busting via renaming the files unique names
    filerev: {
      dev: {
        src: [
          buildConfig.buildDir.clientDir + '/**/*',
          '!' + buildConfig.buildDir.clientDir + '/**/*.{ico,html}'
        ],
        filter: 'isFile'
      }
    },

    // puts bower libraries into index.html
    wiredep: {
      dev: {
        ignorePath: /\.\.\/\.\./,
        src: buildConfig.buildDir.clientDir + '/' + buildConfig.appFiles.html
      }
    },

    // puts all compiled JavaScript and CSS in our index.html so we don't have to manually do it.
    injector: {
      options: {
        template: buildConfig.buildDir.clientDir + '/' + buildConfig.appFiles.html,
        ignorePath: buildConfig.buildDir.clientDir + '/',
        addRootSlash: false
      },
      dev: {
        files: {
          '<%= buildConfig.buildDir.clientDir + "/" + buildConfig.appFiles.html %>': ['<%= buildConfig.buildDir.clientDir %>/*.module.js',
            '<%= buildConfig.buildDir.clientDir %>/**/*.module.js',
            '<%= buildConfig.buildDir.clientDir %>/*.js',
            '<%= buildConfig.buildDir.clientDir %>/**/*.js',
            '<%= buildConfig.buildDir.clientDir %>/*.css',
            '<%= buildConfig.buildDir.clientDir %>/**/*.css']
        },

        options: {
          sort: function (a, b) {
            var aIsClientSource = a.indexOf('.module') > -1;
            var bIsClientSource = b.indexOf('.module') > -1;
            if (aIsClientSource === true && bIsClientSource === true) {
              return 0;
            }
            else if (aIsClientSource === true && bIsClientSource === false) {
              return -1;
            }
            else if (aIsClientSource === false && bIsClientSource === true) {
              return 1;
            }
          }
        }
      },
      prod: {
        files: {
          '<%= buildConfig.buildDir.clientDir + "/" + buildConfig.appFiles.html %>': ['<%= buildConfig.buildDir.clientDir %>/*.js',
            '<%= buildConfig.buildDir.clientDir %>/*.css']
        },

        options: {
          sort: function (a, b) {
            var aIsClientSource = a.indexOf('.bowerDependencies') > -1;
            var bIsClientSource = b.indexOf('.bowerDependencies') > -1;
            if (aIsClientSource === true && bIsClientSource === true) {
              return 0;
            }
            else if (aIsClientSource === true && bIsClientSource === false) {
              return -1;
            }
            else if (aIsClientSource === false && bIsClientSource === true) {
              return 1;
            }
          }
        }
      }
    },

    // runs long tasks concurrently to speed up the overall build
    concurrent: {
      testAndLess: {
        tasks: [
          'test',
          'less:library'
        ]
      },

      templatesAndUglify: {
        tasks: [
          'ngtemplates',
          'uglify:prod'
        ]
      },

      watchAndNodemonLibrary: {
        tasks: [
          'nodemon:dev',
          'watch:library'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // Starts (and supervises) an Express.js web server

    express: {
      localServer: {
        options: {
          port: 8626,
          bases: './',
          debug: true,
          open: true,
          server: buildConfig.staticServerJS
        }
      },

      demoServer: {
        options: {
          port: 8626,
          bases: '.',
          debug: true,
          open: true,
          server: buildConfig.demoFiles.serverJS
        }
      }
    },

    // Runs predefined tasks whenever watched file patterns are added, changed or deleted.
    watch: {
      options: {
        livereload: true
      },

      dev: {
        files: '<%= buildConfig.sourceDir.clientDir %>/**/*',
        tasks: 'build-app-dev'
      },

      prod: {
        files: '<%= buildConfig.sourceDir.clientDir %>/**/*',
        tasks: 'build-app-prod'
      },

      library: {
        files: '<%= buildConfig.sourceDir.clientDir %>/**/*',
        tasks: 'build-library-prod'
      }
    },

    nodemon: {
      dev: {
        script: buildConfig.demoFiles.serverJS,
        options: {
          ignore: [buildConfig.nodeModulesFolder + '/**',
            buildConfig.bowerComponentsFolder + '/**']
        }
      }
    }
  };

  grunt.initConfig(tasks);

  // ************************************************************
  // ** development tasks **/
  grunt.registerTask('analyze',
    'Validates your code and ensures it follows consistent styling.',
    ['jshint', 'jscs', 'complexity']);
  grunt.registerTask('test',
    'Runs all unit tests based on the karma.conf.js configurations and calculates test coverage.',
    ['karma', 'coverage']);

  grunt.registerTask('build-library-dev',
    'Cleans up the build folders, LESS files to 1 optimized CSS file, Parses CSS and adds vendor-prefixed properties', [
//      'clean',
      'env:dev',
//         'wdprBowerAutoBuild',
        'less:library',
//      'autoprefixer'
      ]);

  // build a block/library
  grunt.registerTask('build-library-prod', [
    'env:build',
    'clean',
    'analyze',
    'test',
    'copy:images',
    'copy:fonts',
    'less:library',
    'autoprefixer',
    'concat:library',
    'ngAnnotate',
    'ngtemplates',
    'uglify:library'
  ]);

  // test and debug your code quickly
  grunt.registerTask('build-app-dev', [
    'env:dev',
    'clean',
//     'wdprBowerAutoBuild',
    'less:dev',
    'autoprefixer',
    'copy:dev',
    'wiredep:dev',
    'filerev',
    'injector:dev'
  ]);

  grunt.registerTask('build-app-prod', [
    'env:build',
    'clean',
    'analyze',
//     'wdprBowerAutoBuild',
    'concurrent:testAndLess',
    'autoprefixer',
    'copy:prod',
    'copy:images',
    'copy:fonts',
    'copy:static',
    'copy:nodeModules',
    'copy:packageJSON',
    'concat:library',
    'concat:bower',
    'concat:css',
    'ngAnnotate',
    'concurrent:templatesAndUglify',
    'injector:prod']);

  grunt.registerTask('serve-library-dev',
    'Validates your code, ensures styling is consistent, runs all of your unit tests, and concatenates and uglifies your CSS, HTML, and JavaScript together for production deployment. It then runs a local node server to test your application, and will then watch your local files. If they change, it will automatically re-run the build and reload.', [
      'build-library-dev',
      'express:demoServer',
      'watch:dev']);

  grunt.registerTask('serve-library-prod',
    'Validates your code, ensures styling is consistent, runs all of your unit tests, and concatenates and uglifies your CSS, HTML, and JavaScript together for production deployment. It then runs a local node server to test your demo for the library, and will then watch your local files. If they change, it will automatically re-run the build and reload.', [
      'build-library-prod',
      'express:demoServer',
      'watch:prod']);

  grunt.registerTask('serve-app-dev', 'Validates your code, ensures styling is consistent, and then runs a local node server to test your application. It will then watch your local files. If they change, it will automatically reload.', [
    'build-app-dev',
    'express:localServer',
    'watch:dev']);

  grunt.registerTask('serve-app-prod',
    'Validates your code, ensures styling is consistent, runs all of your unit tests, and concatenates and uglifies your CSS, HTML, and JavaScript together for production deployment. It then runs a local node server to test your application, and will then watch your local files. If they change, it will automatically re-run the build and reload.', [
      'build-app-prod',
      'express:localServer',
      'watch:prod']);

  // TODO: make grunt --help
  grunt.registerTask('default',
    'Validates your code, ensures styling is consistent, and then runs a local node server to test your application. It will then watch your local files. If they change, it will automatically reload.',
    ['clean', 'analyze', 'test']);
};
