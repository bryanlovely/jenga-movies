(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .factory('getSuggestions', getSuggestions);

    getSuggestions.$inject = ['$http', '$filter', 'movieDataUrl', 'imdbUrl'];

    /* @ngInject */
    function getSuggestions($http, $filter, movieDataUrl, imdbUrl) {
        return function(nameFragment) {
            return getImdbSuggestions(nameFragment)
                .catch(function(error) {
                    return getOmdbSuggestions(nameFragment);
                })
                .then(function(response) {
                    var results = response.config.imdbCallback ? response.data.d : response.data.Search;
                    var normalizedResults = $filter('normalizeSuggestions')(results);
                    console.log("RESPONSE",response,results, normalizedResults);
                    return $filter('moviesOnly')(normalizedResults);
                });
        };

        function getImdbSuggestions(nameFragment) {
            var imdbSuggestionUrl = imdbUrl + nameFragment.substring(0,1) + '/' + nameFragment + '.json?callback=JSON_CALLBACK';
            return $http.jsonp(imdbSuggestionUrl, {imdbCallback: 'imdb$' + nameFragment});
        }

        function getOmdbSuggestions(nameFragment) {
            var config = {
                params: {
                    s: nameFragment + '*',
                    callback: 'JSON_CALLBACK',
                    requestType: 'json'
                }
            };
            return $http.jsonp(movieDataUrl, config);
        }
    }
})();
