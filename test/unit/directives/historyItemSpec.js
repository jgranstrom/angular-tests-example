'use strict';

/**
 * Define unit tests for historyItem
 */
describe('Directive: historyItem', function() {
  var scope, elm, fromNowFilter, fromNowText;

  beforeEach(module('app.directives.historyItem'));
  beforeEach(inject(function($rootScope, $compile, _fromNowFilter_) {
    fromNowFilter = _fromNowFilter_;
    scope = $rootScope.$new();

    scope.date = new Date();

    // Compile a mock item with history-item support
    elm = angular.element('<span history-item="date" interval="1"></span>');
    $compile(elm)(scope);

    scope.$digest();
    fromNowText = fromNowFilter(scope.date);
  }));

  it('should update the element text', function() {
    var text = elm.text();
    expect(text).toEqual(fromNowText);

    scope.date = new Date(0);
    scope.$digest(); // Manual digest needed for $watch to see changes

    waitsFor(function() {
      // Wait until the text is updated
      return text !== elm.text();
    }, 'The text should be eventually change in response to date', 100);

    runs(function() {
      var newText = elm.text();
      expect(newText).not.toEqual(text);
      expect(newText).toEqual(fromNowFilter(scope.date));
    });
  });
});
