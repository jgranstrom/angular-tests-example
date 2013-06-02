'use strict';

/**
 * Define unit tests for historyCtrl
 */
describe('Controller: historyCtrl', function() {
  var scope, calculatorService, mockBroadcastService, mockHistoryService;

  beforeEach(function() {
    module('app.controllers.HistoryCtrl');
    module('app.services.calculatorService');

    // Create a mock broadcast service with a jasmine spy
    mockBroadcastService = {
      broadcast: jasmine.createSpy()
    };

    // Create a mock history service
    mockHistoryService = {
      history: [],
      remove: jasmine.createSpy(),
      clear: jasmine.createSpy()
    };

    module(function($provide) {
      $provide.value('broadcastService', mockBroadcastService);
      $provide.value('historyService', mockHistoryService);
    });

    inject(function($rootScope, $controller, _calculatorService_) {
      scope = $rootScope.$new();
      calculatorService = _calculatorService_;
      $controller('HistoryCtrl', { $scope: scope });
    });
  });

  // Instead of testing the history service functionality here
  // we simply make sure the controller correctly delegates the
  // calls to the already testing history service.
  describe('history service delegation', function() {
    it('should expose the history service array', function() {
      expect(scope.history).toBe(mockHistoryService.history);
    });

    it('should call history service clear', function() {
      scope.clear();
      expect(mockHistoryService.clear).toHaveBeenCalled();
    });

    it('should call history service clear', function() {
      scope.remove('abc');
      expect(mockHistoryService.remove).toHaveBeenCalledWith('abc');
    });
  });

  describe('functionality', function() {
    it('should combine the "All" alternative with operations into filters', function() {
      expect(scope.filters).toEqual([{ displayText: 'All' }].concat(calculatorService.operations));
    });

    it('should begin with null as current filter', function() {
      expect(scope.currentFilter).toBeNull();
    });

    it('should set current filter on selection', function() {
      scope.applyFilter(scope.filters[1]);
      expect(scope.currentFilter).toBe(scope.filters[1].displayText);
    });

    it('should reset current filter to null on selecting the first "All" filter', function() {
      scope.applyFilter(scope.filters[1]);
      scope.applyFilter(scope.filters[0]);
      expect(scope.currentFilter).toBeNull();
    });

    it('should broadcast setHistorical with historic object on selecting one', function() {
      scope.selectHistorical('historic');
      expect(mockBroadcastService.broadcast).toHaveBeenCalledWith('setHistorical', 'historic');
    });
  });
});