(function() {
  'use strict';

  /**
   * The calculator service provides a set of mathematical operations.
   */
  angular.module('app.services.calculatorService', [])
    .factory('calculatorService', function() {
      /**
       * Contains hard coded operations provided by this service
       * @type {Array}
       */
      var operations = [
        {
          displayText: '+',
          invoke: function(op1, op2) {
            return op1 + op2;
          }
        },
        {
          displayText: '-',
          invoke: function(op1, op2) {
            return op1 - op2;
          }
        },
        {
          displayText: '*',
          invoke: function(op1, op2) {
            return op1 * op2;
          }
        },
        {
          displayText: '/',
          invoke: function(op1, op2) {
            return op1 / op2;
          }
        },
        {
          displayText: '%',
          invoke: function(op1, op2) {
            return op1 % op2;
          }
        }
      ];

      return {
        operations: operations
      };
  });
}());