(function() {
  'use strict';

  /**
   * fromNow filter takes a Date object and returns a string representing the
   * time since that date.
   */
  angular.module('app.filters.fromNow', [])
    .filter('fromNow', function () {
      return function (date) {
        return moment(date).fromNow();
      };
    });
}());