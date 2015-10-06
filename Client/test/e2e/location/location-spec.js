/**
 * Created by jadhavp on 10/1/15.
 */
describe('Location Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Locations';

    beforeEach(function () {
        browser().navigateTo(url);
        element('.container nav ul.appMenu li#Menu_Location a').click();
    });

    it('should add new location', function () {
        pause();
        element('#btnAddLocation').click(); // Open add location view
        input('Location.name').enter('testName');
        input('Location.address').enter('testAddress');
        select('Location.associatedHospital').option('ABC Hospital');
        element('#saveLocation').click();
        expect(repeater('#location-table tbody tr.validRecord').count()).toBeGreaterThan(0);
    });

    it('should edit location', function () {
        var name = element('#location-table tr.validRecord:last td:eq(0)').text();
        name.execute(function () { });
        element('#location-table tbody tr.validRecord:last .icnedit').click(); // Open edit location view
        input('Location.name').enter(name.value + 'NEW');
        element('#saveLocation').click();
        expect(repeater('#location-table tbody tr.validRecord').count()).toBeGreaterThan(0);
    });

    it('should delete location', function () {
        var rowCount = element('#location-table tr.validRecord').count();
        rowCount.execute(function () { });
        var beforeCount = rowCount.value;
        element('#location-table tbody tr.validRecord:last .icndelete').click(); // delete location
        rowCount = element('#location-table tr.validRecord').count();
        rowCount.execute(function () {
        });
        expect(rowCount).toBe(beforeCount - 1);
    });

    it('should add new location for first hierarchy', function () {
        element('#btnAddLocation').click(); // Open add location view
        input('Location.name').enter('LocationForHierarchyTest');
        input('Location.address').enter('testAddress');
        select('Location.associatedHospital').option('ABC Hospital');
        element('#saveLocation').click();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });
});