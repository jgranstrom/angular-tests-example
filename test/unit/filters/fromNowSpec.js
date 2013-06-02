'use strict';

/**
 * Define unit tests for fromNow
 */
describe('Filter: fromNow', function() {
  var fromNowFilter;

  beforeEach(module('app.filters.fromNow'));
  beforeEach(inject(function(_fromNowFilter_) {
    fromNowFilter = _fromNowFilter_;
  }));

  describe('interpolate', function() {
    it('should return moment from Date', function() {
      expect(fromNowFilter(new Date())).toEqual(moment(new Date()).fromNow());
    });
  });
});