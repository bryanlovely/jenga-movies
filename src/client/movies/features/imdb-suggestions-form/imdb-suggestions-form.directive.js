(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .directive('imdbSuggestionsForm', imdbSuggestionsForm);

    /* @ngInject */
    function imdbSuggestionsForm () {
        var directive = {
            bindToController: true,
            controller: ImdbSuggestionsFormController,
            controllerAs: 'suggVm',
            restrict: 'EA',
            link: link,
            templateUrl: 'movies/features/imdb-suggestions-form/imdb-suggestions-form.directive.html',
            scope: true
//             {
//                 'fillForm': '=fillForm'
//             }
        };

        return directive;

        function link(scope, element, attrs, controller) {
            controller.fillForm = scope.$parent.addVm.fillForm;
            console.log(scope, element, attrs, controller);
        }
    }

    ImdbSuggestionsFormController.$inject = ['getSuggestions'];

    /* @ngInject */
    function ImdbSuggestionsFormController(getSuggestions) {
        var vm = this;
        vm.getSuggestions = getSuggestions;
    }

})();
