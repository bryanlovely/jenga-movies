(function() {
    'use strict';

    angular
        .module('movies.addMovie')
        .factory('getMovieData', getMovieData);

    getMovieData.$inject = ['$http', 'movieDataUrl'];

    /* @ngInject */
    function getMovieData ($http, movieDataUrl) {

        return function(imdbId) {
            var config = {
                params: {
                    i: imdbId,
                    plot: 'short',
                    r: 'json',
                    callback: 'JSON_CALLBACK',
                    requestType: 'json'
                }
            };
            return $http.jsonp(movieDataUrl, config)
                .then(function(response) {
                    return response;
                });
        };
    }
})();
