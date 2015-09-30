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
                fakeScope.hospitals= [{"_id":1,"name":"hospital1","address":"abc"},{"_id":2,"name":"hospital1","address":"abc"}];
                fakeScope.Hospital= {"_id":1,"name":"hospital1","address":"abc"};
                httpBackend = $httpBackend;

                fakeScope.getHospital = function(){};
                fakeScope.AddHospital = function(){};
                fakeScope.getHospitalById = function(){};
                $controller('HospitalController',{
                    $scope : fakeScope
                });
            }));

            it('Should test getHospital Method which is used for getting hospital list',function(){
                var tempObj =  fakeScope.hospitals;
                httpBackend.when('GET','http://localhost:3000/hospitals/getAll').respond(tempObj);
                fakehospitalService.getHospitalList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                fakeScope.getHospital();
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test AddHospital Method which is used add hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                fakehospitalService.AddHospitalDetail().then(function(response){
                    expect(response.Data._id).toBe(tempObj._id);
                });
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                fakeScope.AddHospital();
                fakeScope.getHospital();

                console.log(fakeScope.Hospital._id);
                expect(tempObj._id).toBe(1);
            });

            it('Should test getHospitalById Method which is used specific hospital detail by id',function(){
                var tempObj =  fakeScope.Hospital;
                fakeScope.getHospitalById();
                expect(tempObj._id).toBe(1);
            });
        })
    })
})
