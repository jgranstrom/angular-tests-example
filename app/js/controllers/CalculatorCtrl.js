(function() {
  'use strict';

  /**
   * Calculator controller handles the mathematical calculations provided
   * by the application using the calculator service and exposes history
   * with the historyService.
   */
  angular.module('app.controllers.CalculatorCtrl', [
      'app.services.calculatorService',
      'app.services.historyService'
    ])
    .controller('CalculatorCtrl', function ($scope, calculatorService, historyService) {
      // Initialize operations
      $scope.operations = calculatorService.operations;
      $scope.selectedOperation = $scope.operations[0];
      $scope.hasResult = false;

      /**
       * Notify input changes and recalculate with new parameters
       * Add result to history if a valid result has been calculated
       */
      $scope.change = function () {
        $scope.result = $scope.selectedOperation.invoke(parseFloat($scope.op1, 10), parseFloat($scope.op2, 10));
        $scope.hasResult = !isNaN($scope.result);

        // Add to history if a result has been calculated
        if ($scope.hasResult) {
          historyService.addToHistory({
            op1: $scope.op1,
            op2: $scope.op2,
            operation: $scope.selectedOperation,
            result: $scope.result,
            toString: function () {
              return this.op1 + ' ' + this.operation.displayText + ' ' + this.op2 + ' = ' + this.result;
            }
          });
        }
      };

      /**
       * Listen to setHistorical messages to set inputs to historical values
       */
      $scope.$on('setHistorical', function (event, message) {
        $scope.op1 = message.op1;
        $scope.op2 = message.op2;
        $scope.result = message.result;
        $scope.selectedOperation = message.operation;
      });
    });
}());

