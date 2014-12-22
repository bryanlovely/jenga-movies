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

        activate();

        function activate() {
        }
    }

})();
