describe('hierarchy', function () {
    describe('controller', function () {
        describe('hierarchySpec', function () {
            var fakeScope, fakeController, fakeRootScope, httpBackend, fakeHierarchyService, fakeLocationService,fakeQ;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope, $q, $controller, $httpBackend, hierarchyService, locationService) {
                fakeScope = $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeHierarchyService = hierarchyService;
                fakeLocationService = locationService;
                fakeQ=$q;
                fakeScope.hierarchies = [
                    {"_id": 1, "name": "hierarchy1", "address": "abc"},
                    {"_id": 2, "name": "hierarchy1", "address": "abc"}
                ];
                fakeScope.Hierarchy = {"_id": 1, "name": "hierarchy1", "address": "abc"};
                fakeScope.locationList = [
                    { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" },
                    { "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": "2" }
                ];

                httpBackend = $httpBackend;
                fakeScope.getHierarchy = function () {
                };
                fakeScope.AddHierarchy = function () {
                };
                fakeScope.getHierarchyById = function () {
                };
                $controller('hierarchyController', {
                    $scope: fakeScope,
                    hierarchyService: fakeHierarchyService,
                    locationService: fakeLocationService
                });
            }));

            it('Should test get hierarchy Method which is used for getting hierarchy list', function () {
                var tempLocations = fakeScope.locationList

                var tempHierarchies = fakeScope.hierarchies;
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempLocations);
                httpBackend.when('GET', angular.getAppSection('hierarchy').getAll).respond(tempHierarchies);
                spyOn(fakeHierarchyService,'getHierarchyList').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(tempHierarchies);
                    return def.promise;
                });

                fakeScope.getHierarchies();
                httpBackend.flush();
                expect(tempHierarchies.length).toBeGreaterThan(0);
                expect(fakeHierarchyService.getHierarchyList).toHaveBeenCalled();
            });

            it('Should test AddHierarchy Method which is used add Hierarchy  details',function(){
                var tempObj = fakeScope.hierarchies;
                fakeScope.Hierarchy= {"_id": 0, "name": "hierarchy1", "address": "abc"};

                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('hierarchy').getAll).respond(tempObj);
                httpBackend.whenPOST(angular.getAppSection('hierarchy').add).respond(200,{});
               /* spyOn(fakeHierarchyService,'AddHierarchyDetail').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(true);
                    return def.promise;
                });*/


                fakeScope.addHierarchy();
             //   expect(fakeHierarchyService.AddHierarchyDetail).toHaveBeenCalled();
                httpBackend.flush();
            });
            it('Should test AddHierarchy Method for Update',function(){
                var tempObj = fakeScope.hierarchies;
                fakeScope.Hierarchy= {"_id": 1, "name": "hierarchy1", "address": "abc"};

                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('hierarchy').getAll).respond(tempObj);
                httpBackend.whenPUT(angular.getAppSection('hierarchy').update+'1').respond(200,{});
                fakeHierarchyService.UpdateHierarchyDetail(fakeScope.Hierarchy).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                fakeScope.addHierarchy();
                httpBackend.flush();
            });
            it('Should test getHierarchyById Method which is used specific hierarchy detail by id', function () {
                var tempObj = fakeScope.Hierarchy;

                fakeHierarchyService.getHierarchyById(fakeScope.Hierarchy._id).then(function (response) {
                    fakeScope.Hierarchy = response;
                    expect(response.name).toBe(tempObj.name);
                });

                fakeScope.getHierarchyById(fakeScope.Hierarchy._id);

                expect(tempObj._id).toBe(1);
            });

            it('Should test getHierarchyById Method which is used specific hierarchy detail by id', function () {
                var tempObj = fakeScope.Hierarchy;

                fakeHierarchyService.getHierarchyById(fakeScope.hierarchies._id).then(function (response) {
                    expect(response.name).toBe(tempObj.name);
                });

                fakeScope.getHierarchyById(fakeScope.Hierarchy._id);

                expect(tempObj._id).toBe(1);
            });

            it('Should test Deletehierarchy Method which is used delete specific hierarchy detail by id', function () {
                var tempObj = fakeScope.locationList;
                var hierarchyToDelete = '1';
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('hierarchy').getAll).respond(tempObj);
                httpBackend.when("DELETE" ,angular.getAppSection('hierarchy').delete+'1').respond(tempResponse);

                fakeHierarchyService.DeleteHierarchyDetail(hierarchyToDelete).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                fakeScope.deleteHierarchy(hierarchyToDelete);
                httpBackend.flush();
            });
        })
    })
})
