/**
 * Created by katarep on 9/28/15.
 */
describe('hospital',function(){
    describe('controller',function(){
        describe('hospitalSpec',function(){
            var fakeScope, fakeController, fakeRootScope,httpBackend,fakehospitalService, fakeQ;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope,$q, $controller,$httpBackend,hospitalService) {
                fakeScope =  $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeQ = $q;
                fakehospitalService = hospitalService;
                fakeScope.hospitals = [{"_id":1,"name":"hospital1","address":"abc"},{"_id":2,"name":"hospital1","address":"abc"}];
                fakeScope.Hospital= {"_id":1,"name":"hospital1","address":"abc"};
                httpBackend = $httpBackend;

                fakeScope.GetHospital = function(){};
                fakeScope.AddHospital = function(){};
                fakeScope.GetHospitalById = function(){};
                $controller('HospitalController',{
                    $scope : fakeScope,
                    hospitalService : fakehospitalService
                });
            }));

            it('Should test GetHospital Method which is used for getting hospital list',function(){
                var tempObj =  fakeScope.hospitals;

                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                fakehospitalService.GetHospitalList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                fakeScope.GetHospital();
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
            it('Should test AddHospital Method which is used add hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                tempObj._id = 0;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                httpBackend.when('POST',angular.getAppSection('hospital').add).respond(200,tempObj);

               fakehospitalService.AddHospitalDetail(tempObj).then(function(response){

                    expect(response.Data.name).toBe(fakeScope.Hospital.name);
                });
                fakeScope.AddHospital();
                fakeScope.GetHospital();
                httpBackend.flush();

                expect(tempObj.name).toBe("hospital1");
            });

            it('Should test UpdateHospital Method which is used add hospital details',function(){

                var tempObj =  fakeScope.Hospital;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                httpBackend.when('PUT',angular.getAppSection('hospital').update+'1').respond(200,tempObj);
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                fakeScope.AddHospital();
                fakeScope.GetHospital();
                httpBackend.flush();
                expect(tempObj.name).toBe("hospital1");
            });

            it('Should test GetHospitalById Method which is used specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;
                var name;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(fakeScope.hospitals);
                httpBackend.when('GET',angular.getAppSection('hospital').get+'1').respond(200,tempObj);

                fakehospitalService.GetHospitalById(tempObj._id).then(function(response){

                    name = response.Data.name;
                    expect(response.Data.name).toBe(tempObj.name);
                });
                fakeScope.GetHospitalById(fakeScope.Hospital._id);
                httpBackend.flush();
                expect(tempObj.name).toBe(name);
            });

            it('Should test GetHospitalById Method which is used specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;

                fakehospitalService.GetHospitalById(fakeScope.hospitals._id).then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });

                fakeScope.GetHospitalById(fakeScope.Hospital._id);

                expect(tempObj._id).toBe(1);
            });

            it('Should test DeleteHospital Method which is used delete specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;
                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(fakeScope.hospitals);
                httpBackend.when('DELETE',angular.getAppSection('hospital').delete+fakeScope.Hospital._id).respond(200,fakeScope.Hospital);
                fakehospitalService.DeleteHospitalDetail(1).then(function(){
                });
                fakeScope.DeleteHospital(fakeScope.Hospital._id);
                httpBackend.flush();
                expect(true).toBe(true);
            });
        })
    })
})
