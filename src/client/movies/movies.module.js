(function() {
    'use strict';

    angular
        .module('movies', [
//             'ngAnimate',
            'ngTouch',
//             'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'movies.core',
            'movies.layout',
            'movies.imdb-suggestions-form',
            'movies.movieList',
            'movies.addMovie',
            'movies.firebase'//,
//             'movies.route'
            ]);
})();
