/* jshint -W117, -W030 */
'use strict';

describe('movies.imdb-suggestions-form', function() {
    var controller;
    var scope;

    beforeEach(function() {
        module('movies.imdb-suggestions-form', function($provide) {
            specHelper.fakeStateProvider($provide);
        });
        specHelper.injector(function($controller, $q, $rootScope) {});
    });

    describe('Suggestions controller', function() {
        beforeEach(function() {
            scope = $rootScope.$new();
            controller = $controller('SuggestionsController as vm', {
                $scope: scope
            });
            $rootScope.$apply();
        });

        it('should exist', function() {
            expect(controller).to.be.defined;
        });

        it('should have a title', function() {
            expect(scope.vm.title).to.equal('Suggestions');
        });

        specHelper.verifyNoOutstandingHttpRequests();
    });
});
