(function() {
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
                templateUrl: 'movies/features/add-movie/add-movie.view.html',
                controller: 'AddMovieController',
                controllerAs: 'addVm'
            })
            .state('movieList', {
                url: '/',
                templateUrl: 'movies/features/movie-list/movie-list.view.html',
                controller: 'MovieListController',
                controllerAs: 'listVm'
            })
            .state('suggestions', {
                url: '/suggestions',
                templateUrl: 'movies/features/suggestions/suggestions.html'//,
//                 controller: 'SuggestionsCtrl',
//                 controllerAs: 'suggVm'
            })
//             .state('default', {
//                 url: '/',
//                 template: '<div><h1>Movies - root</h1></div>',
//                 title: 'Movies'
//             })
            ;
    }
})();
