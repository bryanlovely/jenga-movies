(function(_) {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .filter('moviesOnly', moviesOnly);

    function moviesOnly() {
        return function(input) {
            return input.filter(function(item) {
                return !_.isNull(item.id.match(/^tt/));
            });
        };
    }

})(window._);
