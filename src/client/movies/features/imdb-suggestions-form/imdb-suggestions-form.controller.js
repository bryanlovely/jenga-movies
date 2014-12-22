(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .controller('ImdbSuggestionsFormController', ImdbSuggestionsFormController);

    ImdbSuggestionsFormController.$inject = ['$scope', 'getSuggestions'];

    /* @ngInject */
    function ImdbSuggestionsFormController($scope, getSuggestions) {
        var vm = this;
        vm.fillForm = fillForm;
        vm.getSuggestions = getSuggestions;

        function fillForm(item) {
            console.log("fillForm", item);
        }
    }

})();
