(function() {
  'use strict';

  /**
   * The history service provides a shared history for arbitrary objects
   * with a set maximum length.
   */
  angular.module('app.services.historyService', [])
    .factory('historyService', function() {
      /**
       * @type {{limit: number}}
       */
      var options = {
        limit: 10
      };

      /**
       * The array of history elements
       * @type {Array}
       */
      var history = [];

      /**
       * Add an arbitrary element to history
       * @param element The element to add
       */
      function addToHistory(element) {
        element.addedTime = element.addedTime || new Date();

        history.splice(0, 0, element);
        if(history.length > options.limit) {
          history.pop();
        }
      }

      /**
       * Remove a specific element from the history
       * @param element The element to remove
       */
      function remove(element) {
        var i = 0;
        for( ; i < history.length; i++) {
          if(history[i] === element) {
            return history.splice(i, 1);
          }
        }
      }

      /**
       * Clear the entire history
       */
      function clear() {
        history.length = 0;
      }

      return {
        options: options,
        history: history,
        addToHistory: addToHistory,
        remove: remove,
        clear: clear
      };
  });
}());