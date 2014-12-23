(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .filter('moviesOnly', moviesOnly);

    function moviesOnly () {
        return function (input) {
            return input.data.Search.filter(function(item) {
                return !_.isNull(item.imdbID.match(/^tt/)) && item.Type !== 'episode';
            });
        };
    }

    function capitalize(val) {
        return val.replace(/(^|\s)([a-z])/g, function(m, p1, p2){ return p1+p2.toUpperCase(); } );
    };

})();
