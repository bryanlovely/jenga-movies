/* jshint -W117, -W030 */
'use strict';

describe('Filter', function() {

    beforeEach(function() {
        module('movies.imdb-suggestions-form');
        specHelper.injector(function(moviesOnlyFilter) {});
    });

    describe('moviesOnly', function() {
        it('should exist', function() {
            expect(moviesOnlyFilter).to.be.defined;
        });

        it('should prepend every item with \'filtered\'', function() {
            expect(moviesOnlyFilter('item')).to.equal('filtered-item');
        });
    });
});
