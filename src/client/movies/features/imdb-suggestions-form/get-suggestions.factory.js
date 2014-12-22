(function() {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .factory('getSuggestions', getSuggestions);

    getSuggestions.$inject = ['$http', 'suggestionUrl'];

    /* @ngInject */
    function getSuggestions($http, suggestionUrl) {
        return function(val) {
            val = val.toLowerCase().replace(/ /, '_');
            var url = suggestionUrl + val.substr(0, 1) + '/' + val + '.json' + '?callback=JSON_CALLBACK';
            return $http.jsonp(url)
                .then(function(response) {
                    return response.data.d.filter(function(item) {
                        return !_.isNull(item.id.match(/^tt/));
                    }).map(function(item) {
                        console.log(item.l, item.i);
                        return {
                            id: item.id,
                            title: item.l,
                            year: item.y,
                            format: item.q,
                            starring: item.s
                        };
                    })
                    ;

                });
        };
    }
})();
