(function () {
    'use strict';

    angular
        .module('movies')
        .config(moviesState);

    /* @ngInject */
    function moviesState($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('addMovie', {
                url: '/add-movie',
                templateUrl: 'movies/features/add-movie/add-movie.html',
                controller: 'AddMovieCtrl',
                controllerAs: 'AddMovieVm'
            })
            .state('movieList', {
                url: '/movie-list',
                templateUrl: 'movies/features/movie-list/movie-list.html',
                controller: 'MovieListCtrl',
                controllerAs: 'MovieListVm'
            })
            .state('suggestions', {
                url: '/suggestions',
                templateUrl: 'movies/features/suggestions/suggestions.html'//,
//                 controller: 'SuggestionsCtrl',
//                 controllerAs: 'suggVm'
            })
            .state('default', {
                url: '/',
                template: '<div><h1>Movies - root</h1></div>',
                title: 'Movies'
            })
            ;
    }
})();
