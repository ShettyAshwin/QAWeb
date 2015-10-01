/**
 * Created by jadhavp on 10/1/15.
 */
describe('Location Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hospitals';

    beforeEach(function () {
        browser().navigateTo(url);
        element('.container nav ul li a:contains("Locations")').click();
    });

});