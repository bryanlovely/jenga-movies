(function(_) {
    'use strict';

    angular
        .module('movies.addMovie')
        .controller('AddMovieController', AddMovieController);

    AddMovieController.$inject = ['getMovieData', 'addMovieModal', 'movieListFactory'];

    /* @ngInject */
    function AddMovieController(getMovieData, addMovieModal, movieListFactory) {
        var vm = this;

        vm.addedMovie;
        vm.addMovie = addMovie;
        vm.addMovieModal = addMovieModal;
        vm.fillForm = fillForm;
        vm.title = 'Add A Movie';
        vm.validateForm = validateForm;

        /////////////////////////////////////////////

        function fillForm(imdbSuggestion) {
                console.log(imdbSuggestion);
            getMovieData(imdbSuggestion.id)
                .then(function(response) {
                    vm.addedMovie = response.data;
                });
        }

        function addMovie() {
            console.log('ADDING MOVIE', vm.addedMovie);
            movieListFactory.addMovie(vm.addedMovie);
            addMovieModal.closeModal();
        }

        function validateForm() {
            return !_.isUndefined(vm.addedMovie) &&         // there's a selected movie
                !_.isUndefined(vm.addedMovie.format) &&     // a format button has been hit
                _.some(vm.addedMovie.format);               // at least one format button is selected
        }
    }

})(window._);
