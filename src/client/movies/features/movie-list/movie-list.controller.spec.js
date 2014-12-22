/* jshint -W117, -W030 */
'use strict';

describe('movies.movieList', function() {
    var controller;
    var scope;

    beforeEach(function() {
        module('movies', function($provide) {
            specHelper.fakeStateProvider($provide);
        });
        specHelper.injector(function($controller, $q, $rootScope) {});
    });

    describe('MovieList controller', function() {
        beforeEach(function() {
            scope = $rootScope.$new();
            controller = $controller('MovieListController as vm', {
                $scope: scope
            });
            $rootScope.$apply();
        });

        it('should exist', function() {
            expect(controller).to.be.defined;
        });

        it('should have a title', function() {
            expect(scope.vm.title).to.equal('MovieList');
        });

        specHelper.verifyNoOutstandingHttpRequests();
    });
});
