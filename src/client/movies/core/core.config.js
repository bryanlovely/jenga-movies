(function() {
    'use strict';

    angular
        .module('movies.core')
        .value('movieDataUrl', 'http://www.omdbapi.com/')
        .config(configuration)
        .controller('CoreController', CoreController);

    function configuration() {
        // TODO: Implementation of configuration in module movies.core
    }

    /** temp code until I get the routes/states working **/
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
