'use strict';

/**
 * Define unit tests for historyService
 */
describe('Service: historyService', function() {
  var historyService;

  beforeEach(module('app.services.historyService'));
  beforeEach(inject(function(_historyService_) {
    historyService = _historyService_;
  }));

  describe('api', function() {
    it('should expose the correct api', function() {
      expect(typeof historyService.options).toEqual('object');
      expect(Array.isArray(historyService.history)).toBe(true);
      expect(typeof historyService.addToHistory).toEqual('function');
      expect(typeof historyService.remove).toEqual('function');
      expect(typeof historyService.clear).toEqual('function');
    });
  });

  describe('functionality', function() {
    describe('add', function() {
      it('should begin as empty', function() {
        expect(historyService.history.length).toEqual(0);
      });

      it('should add one to history', function() {
        historyService.addToHistory({ historyItem: 'test' });

        expect(historyService.history.length).toEqual(1);
        expect(historyService.history[0].historyItem).toEqual('test');
      });

      it('should should limit size and keep newest', function() {
        for( var i = 0; i < historyService.options.limit; i++) {
          historyService.addToHistory({ i: i });
        }
        expect(historyService.history.length).toEqual(historyService.options.limit);

        historyService.addToHistory({ i: i });
        expect(historyService.history.length).toEqual(historyService.options.limit);
        expect(historyService.history[0].i).toEqual(i);
      });
    });

    describe('remove', function() {
      it('should remove the item', function() {
        var item1 = { some: 'thing' };
        var item2 = { some: 'thing else' };
        historyService.addToHistory(item1);
        historyService.addToHistory(item2);

        historyService.remove(item1);
        expect(historyService.history.length).toEqual(1);
        expect(historyService.history[0].some).toEqual('thing else');
      });

      it('should remove all items', function() {
        historyService.addToHistory({ i: 1 });
        historyService.addToHistory({ i: 2 });
        historyService.addToHistory({ i: 3 });
        historyService.addToHistory({ i: 4 });

        historyService.clear();
        expect(historyService.history.length).toEqual(0);
      });
    });
  });
});