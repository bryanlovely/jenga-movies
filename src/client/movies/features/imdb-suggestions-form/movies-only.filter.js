(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .filter('moviesOnly', moviesOnly);

    function moviesOnly () {
        return function (input) {
            return response.data.d.filter(function(item) {
                return !_.isNull(item.id.match(/^tt/));
            }).map(function(item) {
                console.log(item.l, item.i);
                return {
                    id: item.id,
                    title: item.l,
                    year: item.y,
                    format: item.q,
                    starring: item.s
                };
            });
        };
    }

})();
