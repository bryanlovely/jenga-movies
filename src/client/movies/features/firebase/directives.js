'use strict';

/* Directives */

angular.module('firebase.directives', ['firebase.simpleLogin'])

  /**
   * A directive that shows elements only when user is logged in.
   */
  .directive('ngShowAuth', ['simpleLogin', '$timeout', function(simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function() {
            el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }])

  /**
   * A directive that shows elements only when user is logged out.
   */
  .directive('ngHideAuth', ['simpleLogin', '$timeout', function(simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        function update() {
          el.addClass('ng-cloak'); // hide until we process it

          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function() {
            el.toggleClass('ng-cloak', isLoggedIn !== false);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }]);
