(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .filter('moviesOnly', moviesOnly);

    function moviesOnly () {
        return function (input) {
            return input.data.d.filter(function(item) {
                return !_.isNull(item.id.match(/^tt/));
            }).map(function(item) {
                return {
                    id: item.id,
                    title: item.l,
                    year: item.y,
                    format: item.q.toLowerCase().replace(/ /, '_'),
                    formatPretty: capitalize(item.q),
                    starring: item.s
                };
            });
        };
    }

    function capitalize(val) {
        return val.replace(/(^|\s)([a-z])/g, function(m, p1, p2){ return p1+p2.toUpperCase(); } );
    };

})();
