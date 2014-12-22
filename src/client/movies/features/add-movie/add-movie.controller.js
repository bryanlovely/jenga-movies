(function() {
    'use strict';

    angular
        .module('movies.addMovie')
        .controller('AddMovieController', AddMovieController);

    //AddMovieController.$inject = [''];

    /* @ngInject */
    function AddMovieController() {
        var vm = this;

        vm.title = 'Add A Movie';

        vm.addMovie = {};
        vm.fillForm = fillForm;

        activate();

        function activate() {
        }

        function fillForm(imdbSuggestion) {
            console.log("Add Movie Fill Form", imdbSuggestion.id);
        }
    }


})();
