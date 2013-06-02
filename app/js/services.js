(function() {
  'use strict';

  /**
   * Define services module and service dependencies
   */
  angular.module('app.services', [
    'app.services.calculatorService',
    'app.services.historyService',
    'app.services.broadcastService',
    'app.services.pollingService'
  ]);
}());