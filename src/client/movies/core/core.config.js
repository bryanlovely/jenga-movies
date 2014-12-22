(function() {
    'use strict';

    angular
        .module('movies.core')
        .config(configuration)
        .controller('CoreController', CoreController);

    function configuration() {
        // TODO: Implementation of configuration in module movies.core
    }


    function CoreController ($modal) {
        var vm = this;
        vm.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'movies/features/add-movie/add-movie.html',
                controller: 'AddMovieController as addVm',
                size: size,
                resolve: {}
            });
        };

    }
})();
