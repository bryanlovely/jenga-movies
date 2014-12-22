(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .factory('getSuggestions', getSuggestions);

    getSuggestions.$inject = ['$http', '$filter', 'suggestionUrl'];

    /* @ngInject */
    function getSuggestions($http, $filter, suggestionUrl) {
        return function(val) {
            val = val.toLowerCase().replace(/ /, '_');
            var url = suggestionUrl + val.substr(0, 1) + '/' + val + '.json' + '?callback=JSON_CALLBACK';
            return $http.jsonp(url)
                .then(function(response) {
                    return $filter('moviesOnly')(response);
                });
        };
    }
})();
