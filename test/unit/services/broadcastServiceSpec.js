'use strict';

/**
 * Define unit tests for broadcastService
 */
describe('Service: broadcastService', function() {
  var scope, broadcastService;

  beforeEach(module('app.services.broadcastService'));
  beforeEach(inject(function(_broadcastService_, $rootScope) {
    broadcastService = _broadcastService_;
    scope = $rootScope.$new();
  }));

  describe('api', function() {
    it('should expose the right api', function() {
      expect(typeof broadcastService.broadcast).toEqual('function');
    });
  });

  describe('functionality', function() {
    it('should broadcast message on scope', function() {
      scope.$on('testBroadcast', function(event, message) {
        expect(message.data).toEqual('test');
      });

      broadcastService.broadcast('testBroadcast', { data: 'test' });
    });
  });
});