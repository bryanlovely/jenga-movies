(function() {
    'use strict';

    angular
        .module('movies.movieList')
        .controller('MovieListController', MovieListController);

    MovieListController.$inject = ['$modal', 'movieListFactory', 'addMovieModal'];

    function MovieListController ($modal, movieListFactory, addMovieModal) {

        var vm = this;

        vm.movieList = movieListFactory.getMovieList();

        vm.openModal = addMovieModal.openModal;

    }

})();
