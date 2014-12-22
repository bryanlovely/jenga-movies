(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .directive('imdbSuggestionsForm', imdbSuggestionsForm);

    //imdbSuggestionsForm.$inject = [''];

    /* @ngInject */
    function imdbSuggestionsForm () {
        var directive = {
            bindToController: true,
            controller: ImdbSuggestionsFormController,
            controllerAs: 'vm',
            restrict: 'EA',
            link: link,
            templateUrl: 'movies/features/imdb-suggestions-form/imdb-suggestions-form.html'
        };

        //ImdbSuggestionsFormController.$inject = [''];

        /* @ngInject */
        function ImdbSuggestionsFormController () {
            var vm = this;
        }

        return directive;

        function link(scope, element, attrs, controller) {
        }
    }
})();
