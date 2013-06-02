(function() {
  'use strict';

  /**
   * The broadcast service provides a way to broadcast and handle messages across the application
   */
  angular.module('app.services.broadcastService', [])
    .factory('broadcastService', function($rootScope) {
      /**
       * Broadcast a message on the root scope
       * @param name The name of the message
       * @param [args] Any arguments to pass
       */
      function broadcast(name, args) {
        $rootScope.$broadcast(name, args);
      }

      return {
        broadcast: broadcast
      };
  });
}());