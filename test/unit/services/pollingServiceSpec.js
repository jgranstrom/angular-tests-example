'use strict';

/**
 * Define unit tests for pollingService
 */
describe('Service: pollingService', function() {
  var pollingService;

  beforeEach(module('app.services.pollingService'));
  beforeEach(inject(function(_pollingService_) {
    pollingService = _pollingService_;
  }));

  describe('api', function() {
    it('should expose the right api', function() {
      expect(typeof pollingService.addTask).toEqual('function');
      expect(typeof pollingService.removeTask).toEqual('function');
      expect(typeof pollingService.taskCount).toEqual('number');
    });
  });

  describe('functionality', function() {
    it('should add two tasks', function() {
      pollingService.addTask(function() {}, 1000);
      pollingService.addTask(function() {}, 1000);

      expect(pollingService.taskCount).toEqual(2);
    });

    it('should remove one of the tasks', function() {
      var task = pollingService.addTask(function() {}, 1000);
      pollingService.addTask(function() {}, 1000);

      pollingService.removeTask(task);

      expect(pollingService.taskCount).toEqual(1);
    });
  });
});