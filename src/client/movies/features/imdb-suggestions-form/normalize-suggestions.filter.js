(function(_) {
    'use strict';

    angular
        .module('movies.imdb-suggestions-form')
        .constant('allowableTypes', {'feature': 'Movie', 'movie': 'Movie', 'TV series': 'Series', 'series': 'Series'})
        .filter('normalizeSuggestions', normalizeSuggestions);

    function normalizeSuggestions(allowableTypes) {
        return function(input) {
            return _.compact(
                _.map(input, function(item) {
                        var mapped = {
                            id: item.id || item.imdbID,
                            title: item.l || item.Title,
                            type: allowableTypes[item.q] || allowableTypes[item.Type],
                            year: item.y || item.Year,
                            starring: item.s || null,
                            thumbnail: item.i ?
                                item.i[0].replace(/_\.jpg$/, '._SX40_CR0,0,40,54_.jpg') :
                                'http://i.media-imdb.com/images/mobile/film-40x54.png'
                        };
                        if ( !_.isUndefined(mapped.type) ) {
                            return mapped;
                        }
                    })
                );
        };
    }

})(window._);
