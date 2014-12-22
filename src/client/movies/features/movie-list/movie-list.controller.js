(function() {
    'use strict';

    angular
        .module('movies.movieList')
        .controller('MovieListController', MovieListController);

    //MovieListController.$inject = [''];

    /* @ngInject */
    function MovieListController() {
        var vm = this;
        vm.title = 'MovieList';

        activate();

        function activate() {
        }
    }

})();
