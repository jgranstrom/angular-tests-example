(function() {
  'use strict';

  /**
   * History controllers handles the operations history
   */
  angular.module('app.controllers.HistoryCtrl', [
      'app.services.calculatorService',
      'app.services.historyService',
      'app.services.broadcastService'
    ])
    .controller('HistoryCtrl', function ($scope, $rootScope, calculatorService, historyService, broadcastService) {
      // Expose the history service directly on the scope
      $scope.history = historyService.history;
      $scope.remove = historyService.remove;
      $scope.clear = historyService.clear;

      $scope.currentFilter = null;

      // Create the filters by adding 'All' to the existing operations
      $scope.filters = [].concat([
        {displayText: 'All'}
      ], calculatorService.operations);

      /**
       * Apply a filter
       * @param flt The filter to apply
       */
      $scope.applyFilter = function (flt) {
        $scope.currentFilter = flt === $scope.filters[0] ? null : flt.displayText;
      };

      /**
       * Select a historical element by sending the 'setHistorical' broadcast message
       * @param hist The historical element to select
       */
      $scope.selectHistorical = function (hist) {
        broadcastService.broadcast('setHistorical', hist);
      };
    });
}());