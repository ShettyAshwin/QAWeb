/**
 * Created by Administrator on 10/1/15.
 */
describe('Hospital Test', function () {
    'use strict';

    var url;
    url = '/Client/app';

    beforeEach(function () {
        browser().navigateTo(url);
    });

    it('should display hospital list',function(){
        input('Hospital.name').enter('ABC Hospital');
        input('Hospital.address').enter('ABC Hospital Address');
        element('#save').click();
        expect(repeater('#hospital-table tbody tr').count()).toBeGreaterThan(1);
    });
});