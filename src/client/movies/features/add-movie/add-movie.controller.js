(function() {
    'use strict';

    angular
        .module('movies.addMovie')
        .controller('AddMovieController', AddMovieController);

    AddMovieController.$inject = ['getMovieData'];

    /* @ngInject */
    function AddMovieController(getMovieData) {
        var vm = this;

        vm.title = 'Add A Movie';
        vm.addMovie = {};
        vm.fillForm = fillForm;

        function fillForm(imdbSuggestion) {
            getMovieData(imdbSuggestion.imdbID);
        }
    }

})();
