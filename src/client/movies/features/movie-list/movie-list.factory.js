(function(Firebase) {
    'use strict';

    angular
        .module('movies.movieList')
        .factory('movieListFactory', movieListFactory);

    movieListFactory.$inject = ['$firebase'];

    function movieListFactory ($firebase) {

        var ref = new Firebase('https://sweltering-fire-6089.firebaseio.com/movieList');
        var sync = $firebase(ref);
        var movieList = sync.$asArray();

        return {
            getMovieList: getMovieList,
            addMovie: addMovie,
            updateMovie: updateMovie,
            deleteMovie: deleteMovie,
        };

        /////////////////////////////////////////////

        function getMovieList () {
            return movieList;
        }

        function addMovie(movieObject) {
            console.log('MOVIE LIST FACTORY', movieObject);
            movieList.$add(movieObject);
        }

        function updateMovie() {

        }

        function deleteMovie() {

        }

    }

})(window.Firebase);
