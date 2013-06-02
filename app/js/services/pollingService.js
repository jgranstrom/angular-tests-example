(function() {
  'use strict';

  /**
   * The polling service provides a polling component that can
   * execute a task on a set interval uing setTimeout().
   * This avoids breaking e2e tests when having periodically running tasks.
   */
  angular.module('app.services.pollingService', [])
    .factory('pollingService', function($rootScope) {
      var id = 0;
      var runningTasks = {};

      /**
       * The count of currently running tasks
       * @type {number}
       */
      var taskCount = 0;

      /**
       * Add a task to the service
       * @param {function} taskWork A function representing the work of the task
       * @param {number} interval The interval in ms between each task cycle
       * @returns {number} The ID of the added task
       */
      function addTask(taskWork, interval) {

        var task = { timeout: null };

        function cycle() {
          task.timeout = setTimeout(function() {
            // Apply the task on the root scope to get $digest support and error handling
            $rootScope.$apply(taskWork);
            cycle();
          }, interval);
        }
        cycle();

        taskCount++;
        runningTasks[id] = task;
        return id++;
      }

      /**
       * Remove a task from the service and stop it from running
       * @param {number} taskId The ID of the task to remove
       */
      function removeTask(taskId) {
          clearTimeout(runningTasks[taskId].timeout);
          delete runningTasks[taskId];
          taskCount--;
      }

      var service = {
        addTask: addTask,
        removeTask: removeTask,
        taskCount: taskCount
      };

      // Define a getter for taskCount
      Object.defineProperty(service, 'taskCount', {
        get: function() {
          return taskCount;
        }
      });

      return service;
  });
}());