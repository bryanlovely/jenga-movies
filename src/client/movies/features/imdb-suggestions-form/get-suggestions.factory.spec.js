/* jshint -W117, -W030 */
describe('Service: GetSuggestions', function() {
    'use strict';

    var getSuggestions;

    // load the service's module
    beforeEach(function() {
        module('movies.imdb-suggestions-form');
        specHelper.injector(function(_GetSuggestions_, $httpBackend) {});
        getSuggestions = GetSuggestions;
    });

    it('should exist', function() {
        expect(getSuggestions).to.be.defined;
    });

    it('should return data', function() {
        expect(getSuggestions.getData().length).to.equal(0);
    });

});
