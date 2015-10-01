/**
* Created by Administrator on 10/1/15.
*/
describe('Hospital Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hospitals';

    beforeEach(function () {
        browser().navigateTo(url);
    });

    it('should display hospital list', function () {

        input('Hospital.name').enter('ABC Hospital');
        input('Hospital.address').enter('ABC Hospital Address');
        element('#save').click();
        expect(repeater('#hospital-table tbody tr').count()).toBeGreaterThan(1);
    });

    it('should save hospital details', function () {
        element('#add-new-hospital').click();
        input('Hospital.name').enter('ABC Hospital save');
        input('Hospital.address').enter('ABC Hospital Address save');
        element('#save').click();
        expect(element('#hospital-table tbody tr:last td:nth-child(1)').text()).toBe("ABC Hospital save");
    });
    it('should edit hospital details', function () {

        element('#edit').click();
        input('Hospital.name').enter('ABC Hospital edit');
        input('Hospital.address').enter('ABC Hospital Address');

        element('#save').click();

        expect(element('#hospital-table tbody tr:nth-child(2) td:nth-child(1)').text()).toBe("ABC Hospital edit");
    });

    it('should delete hospital details', function () {
        element('#add-new-hospital').click();
        input('Hospital.name').enter('ABC Hospital save');
        input('Hospital.address').enter('ABC Hospital Address save');
        element('#save').click();

        element('#hospital-table tbody tr:last .icndelete').click();
        expect(repeater('#hospital-table tbody tr').count()).toBeGreaterThan(1);
    });
});
