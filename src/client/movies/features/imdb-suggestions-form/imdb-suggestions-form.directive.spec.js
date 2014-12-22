/* jshint -W117, -W030 */
'use strict';

describe('Directive: imdbSuggestionsForm', function() {

  var element;
  var scope;

  // load the directive's module
  beforeEach(function() {
      module('movies.imdb-suggestions-form');
      module('dir-templates');
      specHelper.injector(function($rootScope, $compile, $templateCache) {});
      scope = $rootScope.$new();
      element = angular.element('<imdb-suggestions-form></imdb-suggestions-form>');
      element = $compile(element)(scope);
      scope.$digest();
  });

  it('should exist', inject(function($compile, $templateCache) {
      expect(element).to.be.defined;
  }));

  it('should have expected text', inject(function($compile, $templateCache) {
      expect(element.text()).to.equal('This is the imdb-suggestions-form directive.');
  }));

});
