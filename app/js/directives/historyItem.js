(function() {
  'use strict';

  /**
   * Directive for providing automatic updates of timestamps using the fromNow filter
   */
  angular.module('app.directives.historyItem', [
      'app.filters.fromNow',
      'app.services.pollingService'
    ])
    .directive('historyItem', function ($timeout, fromNowFilter, pollingService) {
      return function (scope, element, attrs) {
        var updateTask;
        var val;
        var interval = attrs.interval || 60000; // Default update each minute

        function update() {
          // Update the element text directly to avoid digests
          element.text(fromNowFilter(val));
        }

        // Watch the set property for changes and store value for updates
        scope.$watch(attrs.historyItem, function (value) {
          val = value;
          update();
        });

        updateTask = pollingService.addTask(update, interval);

        // Bind destroy to stop updating removed elements
        element.bind('$destroy', function () {
          pollingService.removeTask(updateTask);
        });
      };
    });
}());