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

    if (grunt.option('dev'))
    {
        process.env.NODE_ENV = 'dev';
    }
    else if (grunt.option('library'))
    {
        process.env.NODE_ENV = 'library';
    }
    else
    {
        process.env.NODE_ENV = 'build';
    }

    console.log("*** process.env.NODE_ENV:", process.env.NODE_ENV);

    // Un-comment to display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        'ngtemplates': 'grunt-angular-templates'
    });
    var bowerClasses = [];
    bowerClasses = require('wiredep')().js;

    var bowerCss = [];
    bowerCss = require('wiredep')().css;

    var tasks = {

        buildConfig: buildConfig,

        // Checks your JavaScript doesn't have common errors defined by the rules in .jshintrc
        jshint: {
            options: {
                force: true,
                jshintrc: '.jshintrc'
            },

            src: {
                expand: true,
                cwd: buildConfig.sourceDir,
                src: buildConfig.appFiles.js.concat(buildConfig.appFiles.jsUnit, '!Gruntfile.js')
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
                cwd: buildConfig.sourceDir,
                src: buildConfig.appFiles.js.concat(buildConfig.appFiles.jsUnit, '!Gruntfile.js')
            }
        },

        // Runs unit tests
        karma: {
            test: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Cleans up the build folders to have a nice, fresh, new build
        clean: {
            all: {
                src: buildConfig.buildDir
            },
        },

        // // copies files from development to the build directory
        copy: {
            dev: {
                expand: true,
                cwd: buildConfig.sourceDir,
                src: buildConfig.appFiles.js.concat(buildConfig.appFiles.templates, buildConfig.appFiles.html),
                dest: buildConfig.buildDir
            },

            prod: {
                expand: false,
                flatten: false,
                cwd: '.',
                src: buildConfig.sourceDir + '/' + buildConfig.appFiles.html,
                dest: buildConfig.buildDir + '/' + buildConfig.appFiles.html
            }
        },

        // // converts your many LESS files to 1 optimized CSS file for much speed
        less: {

            dev: {
                files: {
                  '<%= buildConfig.buildDir + "/" + buildConfig.buildFiles.css %>' : buildConfig.sourceDir + '/' + buildConfig.appFiles.less
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
                    '<%= buildConfig.buildDir + "/" + buildConfig.buildFiles.css %>' : buildConfig.sourceDir + '/' + buildConfig.appFiles.less
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
                        cwd: buildConfig.buildDir,
                        src: '{,*/}*.css',
                        dest: buildConfig.buildDir
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
                src: buildConfig.buildDir + '/' + buildConfig.buildFiles.js,
                dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.js
            }
        },

        // // takes many JavaScript files and combines them into 1 to reduce HTTP requests for much speed
        concat: {

            library: {
                expand: false,
                cwd: '.',
                src: buildConfig.appFiles.js.map(function(item)
                    {
                        if(item.charAt(0) != '!')
                        {
                            return buildConfig.sourceDir + '/' + item;
                        }
                        else
                        {
                            return '!' + buildConfig.sourceDir + '/' + item.substring(1, item.length);
                        }
                    }),
                dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.js
            },

            bower: {
                src: bowerClasses,
                dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.bower
            }
        },

        // // Minifies your JavaScript files to save on file size
        uglify: {
            library: {
                cwd: '.',
                src: buildConfig.buildDir + '/' + buildConfig.buildFiles.js,
                dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.jsMin
            },

            prod: {
                files: [
                {
                    cwd: '.',
                    src: buildConfig.buildDir + '/' + buildConfig.buildFiles.js,
                    dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.js
                },

                {
                    cwd: '.',
                    src: buildConfig.buildDir + '/' + buildConfig.buildFiles.bower,
                    dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.bower
                }
                ],
            },

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
                cwd: '.',
                src: [buildConfig.appFiles.templates, '!' + buildConfig.appFiles.html],
                dest: buildConfig.buildDir + '/' + buildConfig.buildFiles.js
            }
        },

        // cache busting via renaming the files unique names
        filerev: {
            dev: {
                src: [
                    buildConfig.buildDir + '/**/*',
                    '!' + buildConfig.buildDir + '/**/*.{ico,html}'
                ],
                filter: 'isFile'
            }
        },

        // puts bower libraries into index.html
        wiredep: {
            dev: {
                ignorePath: /\.\./,
                src: buildConfig.buildDir + '/' + buildConfig.appFiles.html
            },

        },

        // puts all compiled JavaScript and CSS in our index.html so we don't have to manually do it.
        injector: {
            options: {
                template: buildConfig.buildDir + '/' + buildConfig.appFiles.html,
                ignorePath: buildConfig.buildDir + '/',
                addRootSlash: false
            },
            dev: {
                files: {
                    '<%= buildConfig.buildDir + "/" + buildConfig.appFiles.html %>': ['<%= buildConfig.buildDir %>/*.module.js',
                                                                                        '<%= buildConfig.buildDir %>/**/*.module.js',
                                                                                        '<%= buildConfig.buildDir %>/*.js',
                                                                                        '<%= buildConfig.buildDir %>/**/*.js',
                                                                                        '<%= buildConfig.buildDir %>/*.css',
                                                                                        '<%= buildConfig.buildDir %>/**/*.css']
                },

                options:
                {
                    sort: function(a, b)
                    {
                        var aIsClientSource = a.indexOf('.module') > -1;
                        var bIsClientSource = b.indexOf('.module') > -1;
                        if (aIsClientSource === true && bIsClientSource === true)
                        {
                            return 0;
                        }
                        else if (aIsClientSource === true && bIsClientSource === false)
                        {
                            return -1;
                        }
                        else if (aIsClientSource === false && bIsClientSource === true)
                        {
                            return 1;
                        }
                    }
                }
            },
            prod: {
                files: {
                    '<%= buildConfig.buildDir + "/" + buildConfig.appFiles.html %>': ['<%= buildConfig.buildDir %>/*.js',
                                                                                        '<%= buildConfig.buildDir %>/*.css',]
                },

                options:
                {
                    sort: function(a, b)
                    {
                        var aIsClientSource = a.indexOf('.bowerDependencies') > -1;
                        var bIsClientSource = b.indexOf('.bowerDependencies') > -1;
                        if (aIsClientSource === true && bIsClientSource === true)
                        {
                            return 0;
                        }
                        else if (aIsClientSource === true && bIsClientSource === false)
                        {
                            return -1;
                        }
                        else if (aIsClientSource === false && bIsClientSource === true)
                        {
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
//                     'test',
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

        express:
        {
            localServer: {
                options:
                {
                    port: 8626,
                    bases: './',
                    debug: true,
                    open: true,
//                     server: buildConfig.staticServerJS
                    server: buildConfig.serverJS
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
                files: '<%= buildConfig.sourceDir %>/**/*',
                tasks: 'build-app-dev'
            },

            prod: {
                files: '<%= buildConfig.sourceDir %>/**/*',
                tasks: 'build-app-prod'
            },

            library: {
                files: '<%= buildConfig.sourceDir %>/**/*',
                tasks: 'build-library-dev'
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
        },

        getProdCSS: function()
        {
            var updatedBower = bowerCss.map(function(item)
                            {
                                return buildConfig.sourceDir + '/' + item;
                            });
            updatedBower.push(buildConfig.sourceDir + '/' + buildConfig.appFiles.less);
            return updatedBower;
        }
    };

    grunt.initConfig(tasks);



    // ************************************************************
    // ** development tasks **/
    grunt.registerTask('analyze',
                        'Validates your code and ensures it follows consistent styling.',
                        ['jshint', 'jscs']);
    grunt.registerTask('test',
                        'Runs all unit tests based on the karm.conf.js configurations.',
                        ['karma']);

    grunt.registerTask('build-library-dev',
        'Cleans up the build folders, LESS files to 1 optimized CSS file, Parses CSS and adds vendor-prefixed properties', [
        'clean',
        'less:library',
        'autoprefixer'
    ]);


    // build a block/library
    grunt.registerTask('build-library-prod', [
        'clean',
        'analyze',
        'test',
        'less:library',
        'autoprefixer',
        'concat:library',
        'ngAnnotate',
        'ngtemplates',
        'uglify:library'
    ]);

    // test and debug your code quickly
    grunt.registerTask('build-app-dev', [
        'clean',
        'less:dev',
        'autoprefixer',
        'copy:dev',
        'wiredep:dev',
//         'filerev',
        'injector:dev'
    ]);

    grunt.registerTask('build-app-prod', [
        'clean',
        'analyze',
        'concurrent:testAndLess',
        'autoprefixer',
        'copy:prod',
        'concat:library',
        'concat:bower',
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
