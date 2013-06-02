'use strict';

/**
 * Define unit tests for calculatorService
 */
describe('Service: calculatorService', function() {
  var calculatorService;

  beforeEach(module('app.services.calculatorService'));
  beforeEach(inject(function(_calculatorService_) {
    calculatorService = _calculatorService_;
  }));

  describe('api', function() {
    it('should contain operations', function() {
      expect(calculatorService.operations).toBeDefined();
      expect(calculatorService.operations.length).toBeGreaterThan(0);
    });
  });

  describe('functionality', function() {
    it('should operate on two operands and return numbers', function() {
      var op1 = 10;
      var op2 = 20;
      calculatorService.operations.forEach(function(operation) {
        expect(typeof operation.invoke(op1, op2)).toEqual('number');
      });
    });
  });
});