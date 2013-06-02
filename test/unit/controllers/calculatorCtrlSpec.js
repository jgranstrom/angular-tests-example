'use strict';

/**
 * Define unit tests for calculatorCtrl
 */
describe('Controller: CalculatorCtrl', function() {
  var scope, broadcastService, mockCalculatorService, mockHistoryService;

  beforeEach(function() {
    module('app.controllers.CalculatorCtrl');
    module('app.services.broadcastService');

    // Create a mock calculator service that we have full control over instead of relying on separate services
    mockCalculatorService = {
      operations: [
        {
          displayText: '+',
          invoke: function(op1, op2) {
            return op1 + op2;
          }
        },
        {
          displayText: 'spy1',
          invoke: jasmine.createSpy()
        },
        {
          displayText: 'spy2',
          invoke: jasmine.createSpy()
        }
      ]
    };

    // Create a mock history service with a jasmine spy to trace calls
    mockHistoryService = {
      addToHistory: jasmine.createSpy()
    };

    module(function($provide) {
      $provide.value('calculatorService', mockCalculatorService);
      $provide.value('historyService', mockHistoryService);
    });

    inject(function($rootScope, $controller, _broadcastService_) {
      scope = $rootScope.$new();
      broadcastService = _broadcastService_;
      $controller('CalculatorCtrl', { $scope: scope });
    });
  });

  it('should begin with no result', function() {
    expect(scope.hasResult).toBe(false);
  });

  it('should have a invokable operations and selected default', function() {
    expect(scope.operations.length).toEqual(mockCalculatorService.operations.length);
    expect(scope.selectedOperation).toBe(mockCalculatorService.operations[0]);

    scope.op1 = 10;
    scope.op2 = 20;
    scope.change();

    expect(scope.hasResult).toBe(true);
    // Mock default operation is addition
    expect(scope.result).toEqual(scope.op1 + scope.op2);
  });

  it('should not have a result if operands are incomplete', function() {
    scope.op1 = 10;
    scope.change();

    expect(scope.hasResult).toBe(false);
  });

  it('should update the input upon broadcast setHistorical received', function() {
    var historicalObject = {
      op1: 10,
      op2: 20,
      operation: { some: 'operation' },
      result: 30
    };

    broadcastService.broadcast('setHistorical', historicalObject);

    expect(scope.op1).toEqual(historicalObject.op1);
    expect(scope.op2).toEqual(historicalObject.op2);
    expect(scope.selectedOperation).toBe(historicalObject.operation);
    expect(scope.result).toEqual(historicalObject.result);
  });

  it('should update result for changes on op1, op2 and selectedOperation', function() {
    scope.selectedOperation = scope.operations[1]; // Select a spy operation
    scope.op1 = 10;
    scope.op2 = 20;
    scope.change();
    expect(mockCalculatorService.operations[1].invoke).toHaveBeenCalledWith(scope.op1, scope.op2);

    scope.op1++;
    scope.change();
    expect(mockCalculatorService.operations[1].invoke).toHaveBeenCalledWith(scope.op1, scope.op2);

    scope.op2++;
    scope.change();
    expect(mockCalculatorService.operations[1].invoke).toHaveBeenCalledWith(scope.op1, scope.op2);

    scope.selectedOperation = scope.operations[2];
    scope.change();
    // Old operation should not have been called upon changing operation
    expect(mockCalculatorService.operations[1].invoke.calls.length).toEqual(3);
    expect(mockCalculatorService.operations[2].invoke).toHaveBeenCalledWith(scope.op1, scope.op2);
  });

  it('should add completed calculations to history service', function() {
    scope.op1 = 10;
    scope.op2 = 20;
    scope.change();

    expect(mockHistoryService.addToHistory).toHaveBeenCalled();

    scope.op1++;
    scope.change();

    expect(mockHistoryService.addToHistory.calls.length).toEqual(2);
  });

  it('should not add to history on changes that do not trigger calculations', function() {
    scope.op1 = 10;
    scope.change();

    expect(mockHistoryService.addToHistory).not.toHaveBeenCalled();
  });

  it('should not add to history when setting historic values', function() {
    var historicalObject = {
      op1: 10,
      op2: 20,
      operation: { some: 'operation' },
      result: 30
    };

    broadcastService.broadcast('setHistorical', historicalObject);

    expect(scope.op1).toEqual(historicalObject.op1);
    expect(scope.op2).toEqual(historicalObject.op2);
    expect(scope.selectedOperation).toBe(historicalObject.operation);
    expect(scope.result).toEqual(historicalObject.result);

    expect(mockHistoryService.addToHistory).not.toHaveBeenCalled();
  });
});