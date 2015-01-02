/* jshint -W117, -W030, -W079 */

var specHelper = (function() {
    'use strict';
    var service = {
        fakeStateProvider: fakeStateProvider,
        injector: injector,
        verifyNoOutstandingHttpRequests: verifyNoOutstandingHttpRequests
    };
    return service;

    /**
     * Stub out the $stateProvider so we avoid
     * all routing calls, including the default state
     * which runs on every test otherwise.
     * Make sure this goes before the inject in the spec.
     *
     * @param  {[Object} $provide Angular injector for providers
     */
    function fakeStateProvider($provide) {
        $provide.provider('$state', function() {
            /* jshint validthis:true */
            this.state = sinon.stub();

            this.$get = function() {
                return {
                    get: function() {
                        return {
                            // current: {},  // fake before each test as needed
                            // state:  {}  // fake before each test as needed
                            // more? You'll know when it fails :-)
                        };
                    }
                };
            };
        });
        $provide.provider('$urlRouter', function() {
            /* jshint validthis:true */
            this.otherwise = sinon.stub();

            this.$get = function() {
                return {
                    get: function() {
                        return {
                            // current: {},  // fake before each test as needed
                            // states:  {}  // fake before each test as needed
                            // more? You'll know when it fails :-)
                        };
                    }
                };
            };
        });
    }

    /**
     * Inspired by Angular; that's how they get the
     * parms for injection
     */
    function getFnParams (fn) {
        var fnText;
        var argDecl;

        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var FN_ARG_SPLIT = /,/;
        var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var params = [];
        if (fn.length) {
            fnText = fn.toString().replace(STRIP_COMMENTS, '');
            argDecl = fnText.match(FN_ARGS);
            angular.forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                arg.replace(FN_ARG, function(all, underscore, name) {
                    params.push(name);
                });
            });
        }
        return params;
    }

    /**
     * Injects the list of arguments,
     * adds them as global variables,
     * creates an afterEach that will
     * tear them down after every test.
     */
    function injector () {
        var annotation;
        var body = '';
        var cleanupBody = '';
        var mustAnnotate = false;
        var params;

        if (typeof arguments[0] === 'function') {
            params = getFnParams(arguments[0]);
        }
        // else from here on assume that arguments are all strings
        else if (angular.isArray(arguments[0])) {
            params = arguments[0];
        }
        else {
            params = Array.prototype.slice.call(arguments);
        }

        annotation = params.join('\',\''); // might need to annotate

        angular.forEach(params, function(name, ix) {
            var _name;
            var pathName = name.split('.');
            var pathLen = pathName.length;

            if (pathLen > 1) {
                // name is a path like 'block.foo'. Can't use as identifier
                // assume last segment should be identifier name, e.g. 'foo'
                name = pathName[pathLen - 1];
                mustAnnotate = true;
            }

            _name = '_' + name + '_';
            params[ix] = _name;
            body += name + '=' + _name + ';';
            cleanupBody += 'delete window.' + name + ';';

            // todo: tolerate component names that are invalid JS identifiers, e.g. 'burning man'
        });

        var fn = 'function(' + params.join(',') + '){' + body + '}';

        if (mustAnnotate) {
            fn = '[\'' + annotation + '\',' + fn + ']';
        }

        var exp = 'inject(' + fn + ');' +
            'afterEach(function() {' + cleanupBody + '});'; // remove from window.

        //Function(exp)(); // the assigned vars will be global. `afterEach` will remove them
        /* jshint evil:true */
        new Function(exp)();

        // Alternative that would not touch window but would require eval()!!
        // Don't do `Function(exp)()` and don't do afterEach cleanup
        // Instead do ..
        //     return exp;
        //
        // Then caller must say something like:
        //     eval(specHelper.injector('$log', 'foo'));
    }

    /**
     * Verifies that no http calls have been made that
     * were not expected
     */
    function verifyNoOutstandingHttpRequests () {
        afterEach(inject(function($httpBackend) {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));
    }
})();
