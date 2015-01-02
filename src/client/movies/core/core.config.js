(function() {
    'use strict';

    angular
        .module('movies.core')

        // version of this seed app is compatible with angularFire 0.6
        // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
        .constant('version', '0.8.2')

        // where to redirect users if they need to authenticate (see routeSecurity.js)
        .constant('loginRedirectPath', '/login')

        // your Firebase data URL goes here, no trailing slash
        .constant('FBURL', 'https://sweltering-fire-6089.firebaseio.com')

        // URL for accessing OMDB movie data
        .constant('movieDataUrl', 'http://www.omdbapi.com/')

        // URL for IMDB movie suggestions
        .constant('imdbUrl', 'http://sg.media-imdb.com/suggests/')

        // run configuration
        .config(configuration)

        // double check that the app has been configured before running it and blowing up space and time
//         .run(runModule)
        ;

    function configuration() {
        // TODO: Implementation of configuration in module movies.core
    }


    runModule.$inject = ['FBURL', '$timeout'];
    function runModule(FBURL, $timeout) {
        if (FBURL.match('//INSTANCE.firebaseio.com')) {
            angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
            $timeout(function() {
                angular.element(document.body).removeClass('hide');
            }, 250);
        }
    }

})();
