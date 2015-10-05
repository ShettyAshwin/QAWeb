/**
 * Created by Administrator on 10/1/15.
 */
describe('Hierarchy  Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hospitals';


    beforeEach(function () {
        browser().navigateTo(url);
        element('.container ul.appMenu li:eq(3) a').click();

    });


    it('should add First   Hierarchy details', function () {
        element('#add-new-hierarchy').click();
        input('Hierarchy.name').enter('Hierarchy 1');
        input('Hierarchy.address').enter('  Hierarchy Address 1 ');
        select('Hierarchy.associatedLocation').option('LocationForHierarchyTest');
        input('Hierarchy.order').enter('1');
        element('#save').click();
       expect(element('#hierarchy-table tbody tr:last td:nth-child(1)').text()).toBe("Hierarchy 1");
        pause();

    });
    it('should add Second   Hierarchy details', function () {
        element('#add-new-hierarchy').click();
        input('Hierarchy.name').enter('Hierarchy 2');
        input('Hierarchy.address').enter('  Hierarchy Address 2 ');
        select('Hierarchy.associatedLocation').option('LocationForHierarchyTest');
        input('Hierarchy.order').enter('2');
        element('#save').click();
        expect(element('#hierarchy-table tbody tr:last td:nth-child(1)').text()).toBe("Hierarchy 2");

    });
    it('should edit Hierarchy details', function () {

        var name = element('#hierarchy-table tr:last td:eq(0)').text();
        name.execute(function () { });
        element('#hierarchy-table tbody tr:last .icnedit').click(); // Open edit location view
        input('Hierarchy.name').enter(name.value + ' Updated');
        element('#save').click();

        expect(element('#hierarchy-table tbody tr:last td:nth-child(1)').text()).toBe("Hierarchy 2 Updated");


    });

    it('should delete Hierarchy details', function () {

        element('#add-new-hierarchy').click();
        input('Hierarchy.name').enter(' Hierarchy save');
        input('Hierarchy.address').enter(' Hierarchy Address save');
        element('#save').click();

        element('#hierarchy-table tbody tr:last .icndelete').click();
        expect(repeater('#hierarchy-table tbody tr').count()).toBeGreaterThan(1);
        pause();

    });
});
