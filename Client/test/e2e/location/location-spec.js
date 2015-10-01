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
        element('.container nav ul li:eq(1)').click();
    });
    
    /*it('should add location', function () {
        pause();
        element('#btnAddLocation').click(); // Open add location view
        input('Hospital.name').enter('testName');
        input('Hospital.address').enter('testAddress');
        pause();
        element('#save').click();
        alert(element('#location-table tbody tr').count());
        pause();
        expect(repeater('#location-table tbody tr').count()).toBeGreaterThan(1);
    });*/
    
});