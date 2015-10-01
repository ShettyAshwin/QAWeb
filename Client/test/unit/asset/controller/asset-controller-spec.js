/**
 * Created by petkarp on 10/1/15.
 */
describe('asset', function () {
    describe('controller', function () {
        describe('assetSpec', function () {
            var fakeScope, fakeController, fakeRootScope, httpBackend,fakeQ, fakeHierarchyService, fakeLocationService, fakeAssetService;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope, $q, $controller, $httpBackend, assetService) {
                fakeScope = $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeAssetService = assetService;
                fakeQ = $q;

                /*fakeScope.hospitalList = [{"_id":1,"name":"hospital1","address":"Pune"},
                        {"_id":2,"name":"hospital2","address":"Mumbai"}];
                */
                fakeScope.hospitalList = [{"_id":1,"name":"hospital1","address":"Pune"}
                    ];


                fakeScope.locationList = [
                    { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" },
                    { "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": "2" }
                ];

                fakeScope.hierarchyList =  [
                    {"_id": 1, "name": "hierarchy1", "address": "abc"},
                    {"_id": 2, "name": "hierarchy1", "address": "abc"}
                ];

                fakeScope.assets = [
                    {   "_id" :"1",
                        "name":"Asset1",
                        "properties":[{"name":"p1","value":"v1"},{"name":"p2","value":"v2"}],
                        "hierarchyId":"1"},
                    {   "_id" :"1",
                        "name":"Asset1",
                        "properties":[{"name":"p1","value":"v1"}],
                        "hierarchyId":"1"}
                ];

                httpBackend = $httpBackend;

                $controller('assetController', {
                    $scope: fakeScope,
                    assetService: fakeAssetService
                });
            }));

            it('Should test getHospitalList Method which is used for getting Hospital list',function(){
                var tempObj =  fakeScope.hospitalList;

                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                fakeAssetService.getHospitalList().then(function(response){
                    expect(response.responseData[0]._id).toBe(tempObj[0]._id);
                });
                fakeScope.getHospitalList();
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test getLocationsByHospital  Method which is used for getting Location list',function(){
                var tempObj =  fakeScope.locationList;
                var tempHospitalId = 1;
                fakeScope.ddlHospital =1;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond({});
                httpBackend.when('GET',angular.getAppSection('location').getByHospital + tempHospitalId).respond(tempObj);
                spyOn(fakeAssetService,'getLocationsByHospital').andCallFake(function(){
                    var def = fakeQ.defer();
                        def.resolve(tempObj);
                    return def.promise;
                });

                /*fakeAssetService.getLocationsByHospital().then(function(response){
                 expect(response.responseData[0]._id).toBe(tempObj[0]._id);
                 });*/

                fakeScope.getLocationsByHospital();
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
                expect(fakeAssetService.getLocationsByHospital).toHaveBeenCalled();
            });

        })
    })
})
