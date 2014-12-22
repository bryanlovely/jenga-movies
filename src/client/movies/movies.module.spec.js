/* jshint -W117, -W030 */
'use strict';
describe('Main app module:', function() {
    describe('movies', function() {
        var scope;
        beforeEach(function() {

        });
        it('should exist', function() {
           module('movies');
           inject(function($rootScope) {
               scope = $rootScope.$new();
           });
           expect(scope).to.be.ok;
        });
    });
});