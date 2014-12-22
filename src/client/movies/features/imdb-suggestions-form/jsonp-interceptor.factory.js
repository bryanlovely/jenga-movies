(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .value('suggestionUrl', 'http://sg.media-imdb.com/suggests/')
        .factory('jsonpInterceptor', jsonpInterceptor);

    jsonpInterceptor.$inject = ['$timeout', '$window', '$q'];

    /* @ngInject */
    function jsonpInterceptor($timeout, $window, $q) {
        return {
            'request': function(config) {
                if (config.method === 'JSONP') {
                    var callbackId = angular.callbacks.counter.toString(36);
                    config.callbackName = 'imdb$' + config.url.match(/([^\/]+)\.json/)[1];
                    config.url = config.url.replace('JSON_CALLBACK', config.callbackName);
                    $timeout(function() {
                        $window[config.callbackName] = angular.callbacks['_' + callbackId];
                    }, 0, false);
                }
                return config;
            },

            'response': function(response) {
                var config = response.config;
                if (config.method === 'JSONP') {
                    delete $window[config.callbackName]; // cleanup
                }
                return response;
            },

            'responseError': function(rejection) {
                var config = rejection.config;
                if (config.method === 'JSONP') {
                    delete $window[config.callbackName]; // cleanup
                }
                return $q.reject(rejection);
            }
        };
    }
})();
