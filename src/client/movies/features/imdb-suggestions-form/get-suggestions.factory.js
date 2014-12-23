(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .factory('getSuggestions', getSuggestions);

    getSuggestions.$inject = ['$http', '$filter', 'movieDataUrl'];

    /* @ngInject */
    function getSuggestions($http, $filter, movieDataUrl) {
        return function(nameFragment) {
            var config = {
                params: {
                    s: nameFragment + '*',
                    callback: 'JSON_CALLBACK',
                    requestType: 'json'
                }
            };
            return $http.jsonp(movieDataUrl, config)
                .then(function(response) {
                    return $filter('moviesOnly')(response);
                });
        };
    }
})();
