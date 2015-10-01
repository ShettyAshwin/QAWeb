/**
* Created by Administrator on 10/1/15.
*/
describe('Hierarchy  Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hierarchys';

    beforeEach(function () {
        browser().navigateTo(url);
    });

    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Hierarchies';

    beforeEach(function () {
        //pause();
        browser().navigateTo(url);
        //pause();
        element('.container nav ul li:eq(2)').click();
    });



    it('should display Hierarchy list', function () {
        pause();
        input('Hierarchy.name').enter('Hierarchy 3');
        input('Hierarchy.address').enter('Hierarchy 3 Address');
        element('#save').click();
        expect(repeater('#hierarchy-table tbody tr').count()).toBeGreaterThan(1);
    });

    it('should save Hierarchy details', function () {
        element('#add-new-Hierarchy').click();
        input('Hierarchy.name').enter('ABC Hierarchy save');
        input('Hierarchy.address').enter('ABC Hierarchy Address save');
        element('#save').click();
        expect(element('#hierarchy-table tbody tr:last td:nth-child(1)').text()).toBe("ABC Hierarchy save");
        pause();
    });
    it('should edit Hierarchy details', function () {

        element('#edit').click();
        input('Hierarchy.name').enter('ABC Hierarchy edit');
        input('Hierarchy.address').enter('ABC Hierarchy Address');

        element('#save').click();

        expect(element('#hierarchy-table tbody tr:last td:nth-child(1)').text()).toBe("ABC Hierarchy edit");
        pause();
    });

    it('should delete Hierarchy details', function () {
        pause();
        element('#add-new-hierarchy').click();
        input('Hierarchy.name').enter(' Hierarchy save');
        input('Hierarchy.address').enter(' Hierarchy Address save');
        element('#save').click();

        element('#hierarchy-table tbody tr:last .icndelete').click();
        expect(repeater('#hierarchy-table tbody tr').count()).toBeGreaterThan(1);

    });
});
