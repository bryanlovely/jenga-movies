(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .config(configuration);

    configuration.$inject = ['$httpProvider'];

    /* @ngInject */
    function configuration($httpProvider) {
        $httpProvider.interceptors.push('jsonpInterceptor');
    }

})();
