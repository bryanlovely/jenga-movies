/* jshint -W117, -W030 */
describe('Service: GetMovieData', function () {
    'use strict';

    var getMovieData;

    // load the service's module
    beforeEach(function () {
        module('movies');
        specHelper.injector(function(_GetMovieData_, $httpBackend) {});
        getMovieData = GetMovieData;
    });

    it('should exist', function() {
        expect(getMovieData).to.be.defined;
    });

    it('should return data', function () {
        expect(getMovieData.getData().length).to.equal(0);
    });

});
