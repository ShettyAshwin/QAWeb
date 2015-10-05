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

                fakeScope.assetproperties = [{"name":"p1", "value":"v1"}, {"name":"p2", "value":"v2"}];


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

            it('Should test getHierachiesByLocation  Method which is used for getting Hierachies list',function(){
                var tempObj =  fakeScope.locationList;
                var tmpHierarchies = fakeScope.hierarchyList;
                var tempHospitalId = 1;
                var tempLocationId =1 ;
                fakeScope.ddlHospital =1;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond({});

                //httpBackend.when('GET',angular.getAppSection('hierarchy').getByLocation + tempLocationId).respond(tmpHierarchies);
                spyOn(fakeAssetService,'getHierachiesByLocation').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(tmpHierarchies);
                    return def.promise;
                });


                fakeScope.getHierachiesByLocation();
                httpBackend.flush();
                expect(tmpHierarchies.length).toBeGreaterThan(0);
                expect(fakeAssetService.getHierachiesByLocation).toHaveBeenCalled();
            });

            //getAssetsByHierarchy + getAssetsByHierarchy
            it('Should test getAssetsByHierarchy  Method which is used for getting Assets list',function(){
                var tempObj =  fakeScope.locationList;
                var tmpAssets = fakeScope.assets;
                var tempHospitalId = 1;
                var tempAssetId =1 ;
                fakeScope.ddlHospital =1;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond({});

                //httpBackend.when('GET',angular.getAppSection('asset').getByHierarchy + tempAssetId).respond(tmpAssets);
                spyOn(fakeAssetService,'getAssetsByHierarchy').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(tmpAssets);
                    return def.promise;
                });

                fakeScope.displayAssetsList();
                httpBackend.flush();
                expect(tmpAssets.length).toBeGreaterThan(0);
                expect(fakeAssetService.getAssetsByHierarchy).toHaveBeenCalled();
            });

            //getSelectedHierarchy
            it('Should test getAssetsByHierarchy  Method which is used for getting Assets list',function(){
                 var result = fakeScope.getSelectedHierarchy (1);
                 expect (result._id).toBe(1);
            });

            //addAsset

            it('Should test addAsset  Method for adding new asset',function(){
                fakeScope.ddlhierarchy =1;

                var tempAsset = fakeScope.assets[0];
                tempAsset._id = 0;
                fakeScope.asset = tempAsset;
                spyOn(fakeAssetService,'validateAsset').andCallFake(function(){
                    return "error";
                });


                fakeScope.addAsset();
                expect(fakeAssetService.validateAsset).toHaveBeenCalled();


            });

            it('Should test addAsset  Method for adding new asset',function(){
                fakeScope.ddlhierarchy =1;

                var tempAsset = fakeScope.assets[0];
                tempAsset._id = 0;
                fakeScope.asset = tempAsset;
                spyOn(fakeAssetService,'validateAsset').andCallFake(function(){
                    return "";
                });

                spyOn(fakeAssetService,'addAsset').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(true);
                    return def.promise;
                });

                fakeScope.addAsset();
                expect(fakeAssetService.validateAsset).toHaveBeenCalled();
                expect(fakeAssetService.addAsset).toHaveBeenCalled();

            });

            it('Should test addAsset  Method for Updating existing asset',function(){
                fakeScope.ddlhierarchy =1;

                var tempAsset = fakeScope.assets[0];
                tempAsset._id = 1;
                fakeScope.asset = tempAsset;
                spyOn(fakeAssetService,'validateAsset').andCallFake(function(){
                    return "";
                });

                spyOn(fakeAssetService,'updateAsset').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(true);
                    return def.promise;
                });

                fakeScope.addAsset();
                expect(fakeAssetService.validateAsset).toHaveBeenCalled();
                expect(fakeAssetService.updateAsset).toHaveBeenCalled();

            });

            it('Should test getAssetById  Method',function(){

                var tempAsset = fakeScope.assets[0];
                spyOn(fakeAssetService,'getAssetById').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(tempAsset);
                    return def.promise;
                });

                fakeScope.getAssetById(1);
                expect(fakeAssetService.getAssetById).toHaveBeenCalled();

            });

            it('Should test deleteAsset  Method',function(){

                var tempAsset = fakeScope.assets[0];
                spyOn(fakeAssetService,'deleteAsset').andCallFake(function(){
                    var def = fakeQ.defer();
                    def.resolve(true);
                    return def.promise;
                });

                fakeScope.deleteAsset(1);
                expect(fakeAssetService.deleteAsset).toHaveBeenCalled();

            });

            it('Should test afterGetAsset Method',function(){

                fakeScope.asset = fakeScope.assets[0];
                fakeScope.showList =false;
                fakeScope.afterGetAsset();
                expect(fakeScope.showList).toBe(true);

            });

            it('Should test addProperty Method',function(){

                fakeScope.assetproperties = fakeScope.assets[0].properties;
                var expectedPropertyCount = fakeScope.assetproperties.length+1;
                fakeScope.addProperty ();
                expect(fakeScope.assetproperties.length).toBe(expectedPropertyCount);

            });

            it('Should test removeProperty Method',function(){

                fakeScope.assetproperties = fakeScope.assets[0].properties;
                var expectedPropertyCount = fakeScope.assetproperties.length-1;
                fakeScope.removeProperty(1);
                expect(fakeScope.assetproperties.length).toBe(expectedPropertyCount);

            });

            it('Should test showAssetDetails Method',function(){
                fakeScope.showList = false;
                fakeScope.ddlSelectHierarchy =1;
                fakeScope.showAssetDetails();
                expect(fakeScope.showList).toBe(true);
            });

            it('Should test clear Method',function(){
                fakeScope.assetproperties = fakeScope.assets[0].properties;
                fakeScope.clear();
                expect(fakeScope.assetproperties.length).toBe(1);
            });



        })
    })
})
