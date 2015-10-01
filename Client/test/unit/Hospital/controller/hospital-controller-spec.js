/**
 * Created by katarep on 9/28/15.
 */
describe('hospital',function(){
    describe('controller',function(){
        describe('hospitalSpec',function(){
            var fakeScope, fakeController, fakeRootScope,httpBackend,fakehospitalService;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope,$q, $controller,$httpBackend,hospitalService) {
                fakeScope =  $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakehospitalService = hospitalService;
                fakeScope.hospitals = [{"_id":1,"name":"hospital1","address":"abc"},{"_id":2,"name":"hospital1","address":"abc"}];
                fakeScope.Hospital= {"_id":1,"name":"hospital1","address":"abc"};
                httpBackend = $httpBackend;

                fakeScope.getHospital = function(){};
                fakeScope.AddHospital = function(){};
                fakeScope.getHospitalById = function(){};
                $controller('HospitalController',{
                    $scope : fakeScope,
                    hospitalService : fakehospitalService
                });
            }));

            it('Should test getHospital Method which is used for getting hospital list',function(){
                var tempObj =  fakeScope.hospitals;

                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                fakehospitalService.getHospitalList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                fakeScope.getHospital();
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
            it('Should test AddHospital Method which is used add hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                tempObj._id = null;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                httpBackend.expectPOST(angular.getAppSection('hospital').add).respond(500,tempObj);
                fakehospitalService.AddHospitalDetail(tempObj).then(function(response){
                    expect(response.error.name).toBe(fakeScope.Hospital.name);
                });
                httpBackend.flush();
                var tempObjUpdate =  fakeScope.Hospital;
                //httpBackend.expectPUT(angular.getAppSection('hospital').update+'1').respond(500,tempObj);
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                //httpBackend.flush();
                fakeScope.AddHospital();
                fakeScope.getHospital();
                expect(tempObj.name).toBe("hospital1");
            });

            it('Should test getHospitalById Method which is used specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;

                fakehospitalService.getHospitalById(fakeScope.hospitals._id).then(function(response){
                    fakeScope.Hospital = response;
                    expect(response.name).toBe(tempObj.name);
                });

                fakeScope.getHospitalById(fakeScope.Hospital._id);

                expect(tempObj._id).toBe(1);
            });

            it('Should test getHospitalById Method which is used specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;

                fakehospitalService.getHospitalById(fakeScope.hospitals._id).then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });

                fakeScope.getHospitalById(fakeScope.Hospital._id);

                expect(tempObj._id).toBe(1);
            });

            it('Should test DeleteHospital Method which is used delete specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;
                fakehospitalService.DeleteHospitalDetail(1).then(function(){
                });
                fakeScope.DeleteHospital(fakeScope.Hospital._id);

                expect(true).toBe(true);
            });
        })
    })
})
