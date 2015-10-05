/**
 * Created by petkarp on 10/1/15.
 */

describe('asset',function(){
    describe('services',function(){
        describe('assetServiceSpec',function(){
            var fakeScope,  fakeAssetService, httpBackend;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope,$httpBackend,assetService) {
                fakeScope = $rootScope.$new();

                fakeAssetService= assetService;
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
                    {   "_id" :"2",
                        "name":"Asset2",
                        "properties":[{"name":"p1","value":"v1"}],
                        "hierarchyId":"1"}
                ];

                httpBackend = $httpBackend;

            }));

            it('Should test validateAsset Method without Asset Name, Hierarchy And Propereties ',function(){
                var tempAsset =  {"name":"", hierarchyId :"", "properties":[{"name":"","value":"v1"}]};

                var result =  fakeAssetService.validateAsset(tempAsset);
                expect(result.length).toBeGreaterThan(0);
            });

            it('Should test validateAsset Method without Properety Name ',function(){
                var tempAsset =  {"name":"", hierarchyId :""};

                var result =  fakeAssetService.validateAsset(tempAsset);
                expect(result.length).toBeGreaterThan(0);
            });
            //getAssetsByHierarchy

            it('Should test getAssetsByHierarchy Method which is used for getting Assets list',function(){
                httpBackend.when('GET',angular.getAppSection('asset').getByHierarchy + 1).respond(200,fakeScope.assets);

                fakeAssetService.getAssetsByHierarchy(1).then(function(response){
                    expect(response.responseData[0]._id).toBe(fakeScope.assets[0]._id);
                });
                httpBackend.flush();

            });
            //updateAsset

            it('Should test updateAsset Method success part',function(){
                var tempUpdate= {'Success': true, 'Data': fakeScope.assets[0], 'error': null, 'ErrorCode': ""};
                httpBackend.when('PUT',angular.getAppSection('asset').update + 1, fakeScope.assets[0]).respond(200,tempUpdate);

                fakeAssetService.updateAsset(fakeScope.assets[0]).then(function(response){
                    expect(response.Success).toBe(tempUpdate.Success);
                });
                httpBackend.flush();

            });

            it('Should test updateAsset Method error part',function(){
                var tempUpdate= {'Success': false, 'Data': {}, 'error': 'error1', 'ErrorCode': 500};
                httpBackend.when('PUT',angular.getAppSection('asset').update + 1, fakeScope.assets[0]).respond(500,tempUpdate);

                fakeAssetService.updateAsset(fakeScope.assets[0]).then(function(response){
                    expect(response.ErrorCode).toBe(tempUpdate.ErrorCode);
                });
                httpBackend.flush();

            });

            //addAsset

            it('Should test addAsset Method success part',function(){
                var tempObj= {'Success': true, 'Data': fakeScope.assets[0], 'error': null, 'ErrorCode': ""};
                httpBackend.when('POST',angular.getAppSection('asset').add, fakeScope.assets[0]).respond(200,tempObj);

                fakeAssetService.addAsset(fakeScope.assets[0]).then(function(response){
                    expect(response.Success).toBe(tempObj.Success);
                });
                httpBackend.flush();

            });

            it('Should test addAsset Method error part',function(){
                var tempObj= {'Success': false, 'Data': fakeScope.assets[0], 'error': null, 'ErrorCode': 500};
                httpBackend.when('POST',angular.getAppSection('asset').add, fakeScope.assets[0]).respond(500,tempObj);

                fakeAssetService.addAsset(fakeScope.assets[0]).then(function(response){
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            //getAssetById
            it('Should test getAssetById Method',function(){
                var tempObj= fakeScope.assets[0];
                httpBackend.when('GET',angular.getAppSection('asset').get + fakeScope.assets[0]._id).respond(200,tempObj);
                fakeAssetService.getAssetById(fakeScope.assets[0]._id).then(function(response){
                    console.log(JSON.stringify(response));
                    expect(response.responseData._id).toBe(tempObj._id);
                });
                httpBackend.flush();
            });

            //getHospitalList

            it('Should test getHospitalList Method',function(){
                var tempObj= fakeScope.hospitalList;

                httpBackend.when('GET',angular.getAppSection('hospital').list ).respond(200,tempObj);
                fakeAssetService.getHospitalList(fakeScope.assets[0]._id).then(function(response){
                    console.log(JSON.stringify(response));
                    expect(response.responseData[0]._id).toBe(tempObj[0]._id);
                });
                httpBackend.flush();
            });

            //getLocationsByHospital
            it('Should test getLocationsByHospital Method',function(){
                var hospitalId = 1;
                httpBackend.when('GET',angular.getAppSection('location').getByHospital  + hospitalId).respond(200,fakeScope.locationList);

                fakeAssetService.getLocationsByHospital(hospitalId).then(function(response){
                    expect(response.responseData[0]._id).toBe(fakeScope.locationList[0]._id);
                });
                httpBackend.flush();
            });

            //getHierachiesByLocation
            it('Should test getHierachiesByLocation Method',function(){
                var locationlId = 1;
                httpBackend.when('GET',angular.getAppSection('hierarchy').getByLocation   + locationlId).respond(200,fakeScope.hierarchyList);

                fakeAssetService.getHierachiesByLocation(locationlId).then(function(response){
                    expect(response.responseData[0]._id).toBe(fakeScope.hierarchyList[0]._id);
                });
                httpBackend.flush();
            });
            //

            it('Should test deleteAsset Method success part',function(){
                var assetId= fakeScope.assets[0]._id;
                var tempObj= {'Success': true, 'Data':{}, 'error': null, 'Code': ""};
                httpBackend.when('DELETE',angular.getAppSection('asset').delete + assetId).respond(200,tempObj);

                fakeAssetService.deleteAsset(assetId).then(function(response){
                    expect(response.Success).toBe(tempObj.Success);
                });
                httpBackend.flush();

            });

            it('Should test deleteAsset Method error part',function(){
                var assetId= fakeScope.assets[0]._id;
                var tempObj= {'Success': false, 'Data': {}, 'error': null, 'Code': 500};
                httpBackend.when('DELETE',angular.getAppSection('asset').delete + assetId ).respond(500,tempObj);

                fakeAssetService.deleteAsset(assetId).then(function(response){
                    expect(response.Code).toBe(tempObj.Code);
                });
                httpBackend.flush();
            });

            /*
            it('Should test GetHospitalById Method which is used for getting specific hospital details',function(){
                var tempObj =  fakeScope.hospitals;
                httpBackend.when('GET',angular.getAppSection('hospital').get+tempObj._id).respond(tempObj);
                fakehospitalService.GetHospitalById(fakeScope.hospitals._id).then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
            });

            it('Should test AddHospitalDetail Method which is used add hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                httpBackend.expectPOST(angular.getAppSection('hospital').add).respond(200,tempObj);
                fakehospitalService.AddHospitalDetail().then(function(response){
                    expect(response.Data._id).toBe(tempObj._id);
                });
                httpBackend.flush();

            });

            it('Should test AddHospitalDetail Method with error',function(){
                var tempObj =  fakeScope.Hospital;
                httpBackend.expectPOST(angular.getAppSection('hospital').add).respond(500,tempObj);
                fakehospitalService.AddHospitalDetail().then(function(response){

                    expect(response.Data).toBe(null);
                });
                httpBackend.flush();

            });

            it('Should test UpdateHospitalDetail Method which is used update hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                tempObj.name = "hospital2";
                httpBackend.expectPUT(angular.getAppSection('hospital').update+'1').respond(200,tempObj);
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                httpBackend.flush();
            });

            it('Should test UpdateHospitalDetail Method with error',function(){
                var tempObj =  fakeScope.Hospital;
                tempObj.name = "hospital2";
                httpBackend.expectPUT(angular.getAppSection('hospital').update+'1').respond(500,tempObj);
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data).toBe(null);
                });
                httpBackend.flush();
            });

            it('Should test DeleteHospitalDetail Method which is used delete hospital details',function(){
                var tempObj =  fakeScope.Hospital;

                httpBackend.expectDELETE(angular.getAppSection('hospital').delete +'1').respond(200);
                fakehospitalService.DeleteHospitalDetail(1).then(function(){
                    expect(true).toBe(true);
                });
                httpBackend.flush();

            });

            it('Should test DeleteHospitalDetail Method with error',function(){
                var tempObj =  fakeScope.Hospital;

                httpBackend.expectDELETE(angular.getAppSection('hospital').delete +'1').respond(500);
                fakehospitalService.DeleteHospitalDetail(1).then(function(){
                    expect(false).toBe(false);
                });
                httpBackend.flush();

            });*/
        });
    });
});
