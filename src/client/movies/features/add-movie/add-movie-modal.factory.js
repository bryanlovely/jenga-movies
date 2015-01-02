(function() {
    'use strict';

    angular
        .module('movies.addMovie')
        .factory('addMovieModal', addMovieModal);

    addMovieModal.$inject = ['$modal'];

    /* @ngInject */
    function addMovieModal($modal) {
        var modalInstance;
        return {
            openModal: function(size) {
                modalInstance = $modal.open({
                    templateUrl: 'movies/features/add-movie/add-movie.view.html',
                    controller: 'AddMovieController as addVm',
                    size: size,
                    resolve: {}
                });
            },
            closeModal: function() {
                modalInstance.close();
            }
        };
    }

})();
