/**
 * Created by jadhavp on 10/1/15.
 */
describe('Location Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hospitals';

    beforeEach(function () {
        browser().navigateTo(url);
        element('.container nav ul li:eq(1) a').click();
        pause();
    });

    it('should add new location', function () {
        element('#btnAddLocation').click(); // Open add location view
        input('Location.name').enter('testName');
        input('Location.address').enter('testAddress');
        select('Location.associatedHospital').option('ABC Hospital');
        element('#saveLocation').click();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });

    it('should edit location', function () {
        var name = element('#location-table tr:last td:eq(0)').text();
        name.execute(function () { });
        element('#location-table tbody tr:last .icnedit').click(); // Open edit location view
        input('Location.name').enter(name.value + 'NEW');
        element('#saveLocation').click();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });

    it('should delete location', function () {
        var rowCount = element('#location-table tr').count();
        rowCount.execute(function () { });
        var beforeCount = rowCount.value;
        element('#location-table tbody tr:last .icndelete').click(); // delete location
        rowCount = element('#location-table tr').count();
        rowCount.execute(function () { });
        expect(rowCount).toBe(beforeCount - 1);
    });
});