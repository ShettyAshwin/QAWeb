/**
 * Created by petkarp on 10/5/15.
 */

describe('Asset  Test', function () {
    'use strict';

    var url;
    url = '/QAWebPortal/app/index.html#/Assets';


    beforeEach(function () {
        browser().navigateTo(url);
        element('.container ul.appMenu li:eq(3) a').click();
    });

    it('should select Hospital, Location, Hierarchy and Click on Add Asset and Save it', function () {

        select('ddlHospital').option('z ABC Hospital save');
        sleep(1);
        select ('ddlLocation').option('LocationForHierarchyTest');
        sleep(1);
        select ('ddlSelectHierarchy').option('Hierarchy 1');
        element('#btnAddNewAsset').click();
        input('asset.name').enter('Asset-1')
        select('ddlhierarchy').option('Hierarchy 1');

        element('#addProperty').click();

        input('prop.name').enter('p1');
        input('prop.value').enter('v1');

        element('#btnSave').click();
        //expect(repeater('#tblAsset tbody tr.validRecord').count()).toBeGreaterThan(0);
        expect(element('#tblAsset tbody tr:last td:nth-child(1)').text()).toBe("Asset-1");

    });

    it('should add Second  Asset details', function () {
        select('ddlHospital').option('z ABC Hospital save');
        sleep(1);
        select ('ddlLocation').option('LocationForHierarchyTest');
        sleep(1);
        select ('ddlSelectHierarchy').option('Hierarchy 1');
        element('#btnAddNewAsset').click();
        input('asset.name').enter('Asset-2')
        select('ddlhierarchy').option('Hierarchy 1');

        element('#addProperty').click();
        input('prop.name').enter('p1');
        input('prop.value').enter('v1');
        element('#btnSave').click();

        expect(element('#tblAsset tbody tr:last td:nth-child(1)').text()).toBe("Asset-2");
        pause();
    });

    /*it('should edit asset details', function () {


        //check r u on last record
        expect(element('#tblAsset tbody tr:last td:nth-child(1)').text()).toBe("Asset-2");
        element('#tblAsset tbody tr:last .icnedit').click();// Open edit asset view

        input('asset.name').enter(name.value + ' Updated');
        element('#btnSave').click();

        expect(element('#tblAsset tbody tr:last td:nth-child(1)').text()).toBe("Asset-2 Updated");

        pause();
    });*/

    it('should add Third Asset And Delete it', function () {
        select('ddlHospital').option('z ABC Hospital save');
        sleep(1);
        select ('ddlLocation').option('LocationForHierarchyTest');
        sleep(1);
        select ('ddlSelectHierarchy').option('Hierarchy 1');
        element('#btnAddNewAsset').click();
        input('asset.name').enter('Asset-3')
        select('ddlhierarchy').option('Hierarchy 1');

        element('#addProperty').click();
        input('prop.name').enter('p1');
        input('prop.value').enter('v1');
        pause();
        element('#btnSave').click();

        expect(element('#tblAsset tbody tr:last td:nth-child(1)').text()).toBe("Asset-3");
        element('#tblAsset tbody tr:last .icndelete').click();
        expect(repeater('#tblAsset tbody tr').count()).toBeGreaterThan(1);
        pause();


    });
});

