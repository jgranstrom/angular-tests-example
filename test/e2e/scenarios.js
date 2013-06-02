'use strict';

/**
 * Define the e2e scenarios for the app.
 */
describe('app', function() {

  /**
   * Define e2e scenarios for index
   */
  describe('index', function() {
    beforeEach(function() {
      browser().navigateTo('/app/views/index.html');
    });

    it('should start with hidden result and history', function() {
      expect(element('#result').css('display')).toEqual('none');
      expect(element('#historyContainer').css('display')).toEqual('none');
    });

    it('should show result and history upon entering all input', function() {
      input('op1').enter('10');
      input('op2').enter('20');

      expect(element('#result').css('display')).toEqual('inline-block');
      expect(element('#historyContainer').css('display')).toEqual('block');
      expect(element('#result').text()).toMatch(/.*= \d+.*/);
    });

    it('should add history items when recalculating', function() {
      expect(repeater('#historyContainer tr').count()).toEqual(0);

      input('op1').enter('10');
      input('op2').enter('20');

      expect(repeater('#historyContainer tr').count()).toEqual(1);

      input('op1').enter('11');

      expect(repeater('#historyContainer tr').count()).toEqual(2);

      input('op1').enter('12');
      input('op2').enter('21');

      expect(repeater('#historyContainer tr').count()).toEqual(4);
    });

    it('should remove entire history when clicking clear and hide history', function() {

      input('op1').enter('10');
      input('op2').enter('20');
      input('op1').enter('11');
      input('op1').enter('12');
      input('op2').enter('21');

      expect(repeater('#historyContainer tr').count()).toEqual(4);

      element('[ng-click="clear()"]').click();

      expect(repeater('#historyContainer tr').count()).toEqual(0);

      sleep(1); // Wait for hiding animation
      expect(element('#historyContainer').css('display')).toEqual('none');
    });

    it('should hide all history entries when filtering but keep history visible', function() {

      input('op1').enter('10');
      input('op2').enter('20');
      input('op1').enter('11');
      input('op1').enter('12');
      input('op2').enter('21');

      expect(repeater('#historyContainer tr').count()).toEqual(4);

      element('[ng-click="applyFilter(flt)"]:last').click();

      expect(repeater('#historyContainer tr').count()).toEqual(0);
      expect(element('#historyContainer').css('display')).toEqual('block');
    });

    it('should recalculate upon changing operation', function() {
      input('op2').enter('20');
      input('op1').enter('11');

      expect(repeater('#historyContainer tr').count()).toEqual(1);

      select('selectedOperation').option('-');

      expect(repeater('#historyContainer tr').count()).toEqual(2);
    });
  });
});