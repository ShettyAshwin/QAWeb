/**
 * Created by katarep on 9/29/15.
 */
describe('Hierarchy',function(){
    describe('services',function(){
        describe('hierarchyServiceSpec',function(){
            var fakeScope, fakehierarchyService, httpBackend;

            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope, $httpBackend, hierarchyService) {
                fakeScope = $rootScope.$new();
                fakehierarchyService = hierarchyService;
                fakeScope.hierarchies = [
                    { "_id": 1, "name": "hierarchy1", "address": "abc" },
                    { "_id": 2, "name": "hierarchy1", "address": "abc" }
                ];
                fakeScope.Hierarchy = { "_id": 1, "name": "hierarchy1", "address": "abc" };
                fakeScope.locationList = [
                    { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" },
                    { "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": "2" }
                ];
                httpBackend = $httpBackend;

            }));

            /* getHierarchyList */
            it('Should test getHierarchyList method which is used to get all the hospital location hierarchies list (SUCCESS)', function () {
                var tempObj = fakeScope.hierarchies;

                httpBackend.when('GET', angular.getAppSection('hierarchy').list).respond(tempObj);
                fakehierarchyService.getHierarchyList().then(function (response) {
                    expect(response.responseData.length).toBe(tempObj.length);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test getHierarchyList method which is used to get all the hospital location hierarchies list (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };

                httpBackend.when('GET', angular.getAppSection('hierarchy').list).respond(500, tempObj);
                fakehierarchyService.getHierarchyList().then(function (response) {
                    expect(response.Code).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* AddHierarchyDetail */
            it('Should test AddHierarchyDetail method which is used to add new hospital location hierarchy (SUCCESS)', function () {
                var tempObj = fakeScope.Hierarchy;

                httpBackend.when('POST', angular.getAppSection('hierarchy').add).respond(tempObj);
                fakehierarchyService.AddHierarchyDetail().then(function (response) {
                    expect(response.Success).toBe(true);
                });
                httpBackend.flush();
            });

            it('Should test AddHierarchyDetail method which is used to add new hospital location hierarchy (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };

                httpBackend.when('POST', angular.getAppSection('hierarchy').add).respond(500, tempObj);
                fakehierarchyService.AddHierarchyDetail().then(function (response) {
                    expect(response.Code).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* UpdateHierarchyDetail */
            it('Should test UpdateHierarchyDetail method which is used to update hospital location hierarchy (SUCCESS)', function () {
                var tempHierarchy = fakeScope.Hierarchy;
                var tempObj = { "status": "200", "detail": "" };
                httpBackend.when('PUT', angular.getAppSection('hierarchy').update + tempHierarchy._id).respond(tempObj);
                fakehierarchyService.UpdateHierarchyDetail(tempHierarchy).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                httpBackend.flush();
            });

            it('Should test UpdateHierarchyDetail method which is used to update hospital location hierarchy (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var tempHierarchy = fakeScope.Hierarchy;

                httpBackend.when('PUT', angular.getAppSection('hierarchy').update + tempHierarchy._id).respond(500, tempObj);
                fakehierarchyService.UpdateHierarchyDetail(tempHierarchy).then(function (response) {
                    expect(response.Code).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* getHierarchyById */
            it('Should test getHierarchyById method which is used to get specific hospital location hierarchy (SUCCESS)', function () {
                var tempHierarchy = fakeScope.Hierarchy;
                var hierarchyId = 1;

                httpBackend.when('GET', angular.getAppSection('hierarchy').get + hierarchyId).respond(tempHierarchy);
                fakehierarchyService.getHierarchyById(hierarchyId).then(function (response) {
                    expect(response.responseData.name).toBe(tempHierarchy.name);
                });
                httpBackend.flush();
            });

            it('Should test getHierarchyById method which is used to get specific hospital location hierarchy (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var hierarchyId = 1;

                httpBackend.when('GET', angular.getAppSection('hierarchy').get + hierarchyId).respond(500, tempObj);
                fakehierarchyService.getHierarchyById(hierarchyId).then(function (response) {
                    expect(response.Code).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* DeleteHierarchyDetail */
            it('Should test DeleteHierarchyDetail method which is used to delete specific hospital location hierarchy (SUCCESS)', function () {
                var tempObj = { "status": "200", "detail": "" };
                var hierarchyId = 1;

                httpBackend.when('DELETE', angular.getAppSection('hierarchy').delete + hierarchyId).respond(tempObj);
                fakehierarchyService.DeleteHierarchyDetail(hierarchyId).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                httpBackend.flush();
            });

            it('Should test DeleteHierarchyDetail method which is used to delete specific hospital location hierarchy (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var hierarchyId = 1;

                httpBackend.when('DELETE', angular.getAppSection('hierarchy').delete + hierarchyId).respond(500, tempObj);
                fakehierarchyService.DeleteHierarchyDetail(hierarchyId).then(function (response) {
                    expect(response.Code).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

        });
    });
});