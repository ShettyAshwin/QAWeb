/**
 * Created by jadhavp on 10/1/15.
 */
describe('Location Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hospitals';

    beforeEach(function () {
        //pause();
        browser().navigateTo(url);
        //pause();
        element('.container nav ul li:eq(1) a').click();
    });

    it('should add location', function () {
        pause();
        element('#btnAddLocation').click(); // Open add location view
        input('Location.name').enter('testName');
        input('Location.address').enter('testAddress');
        select('Location.associatedHospital').option('ABC Hospital');
        pause();
        element('#saveLocation').click();
        alert(element('#location-table tbody tr').count());
        pause();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });

    it('should edit location', function () {
        pause();
        var name = element('#location-table tbody tr:last td:eq(0)').text();
        element('#location-table tbody tr:last .icnedit').click(); // Open edit location view
        input('Location.name').enter(name + 'NEW');
        pause();
        element('#saveLocation').click();
        alert(element('#location-table tbody tr').count());
        pause();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });

});