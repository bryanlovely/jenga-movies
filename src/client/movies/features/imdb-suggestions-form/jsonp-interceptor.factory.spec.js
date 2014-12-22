/* jshint -W117, -W030 */
describe('Service: JsonpInterceptor', function () {
    'use strict';

    var jsonpInterceptor;

    // load the service's module
    beforeEach(function () {
        module('movies.imdb-suggestions-form');
        specHelper.injector(function(_JsonpInterceptor_, $httpBackend) {});
        jsonpInterceptor = JsonpInterceptor;
    });

    it('should exist', function() {
        expect(jsonpInterceptor).to.be.defined;
    });

    it('should return data', function () {
        expect(jsonpInterceptor.getData().length).to.equal(0);
    });

});
