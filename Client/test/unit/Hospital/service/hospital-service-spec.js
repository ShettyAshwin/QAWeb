/**
 * Created by katarep on 9/29/15.
 */
describe('hospital',function(){
    describe('services',function(){
        describe('hospitalServiceSpec',function(){
            var  fakeScope, fakehospitalService, httpBackend;


            beforeEach(module('barcoApp'));


            beforeEach(inject(function ($rootScope,$httpBackend,hospitalService) {
                fakeScope = $rootScope.$new();
                fakehospitalService = hospitalService;
                fakeScope.hospitals= [{"_id":1,"name":"hospital1","address":"abc"},{"_id":2,"name":"hospital1","address":"abc"}];
                fakeScope.Hospital= {"_id":1,"name":"hospital1","address":"abc"};
                httpBackend = $httpBackend;

            }));

            it('Should test getHospitalList Method which is used for getting hospital list',function(){
                var tempObj =  fakeScope.hospitals;
                httpBackend.when('GET','http://localhost:3000/hospitals/getAll').respond(tempObj);
                fakehospitalService.getHospitalList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test getHospitalById Method which is used for getting specific hospital details',function(){
                var tempObj =  fakeScope.hospitals;
                httpBackend.when('GET','http://localhost:3000/hospitals/get/'+tempObj._id).respond(tempObj);
                fakehospitalService.getHospitalById(fakeScope.hospitals._id).then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test AddHospitalDetail Method which is used add hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                httpBackend.when('POST','http://localhost:3000/hospitals/add/').respond(tempObj);
                fakehospitalService.AddHospitalDetail().then(function(response){
                    expect(response.Data._id).toBe(tempObj._id);
                });
                httpBackend.flush();
                expect(tempObj._id).toBe(1);
            });

            it('Should test UpdateHospitalDetail Method which is used update hospital details',function(){
                var tempObj =  fakeScope.Hospital;
                tempObj.name = "hospital2";
                httpBackend.when('PUT','http://localhost:3000/hospitals/update/1').respond(tempObj);
                fakehospitalService.UpdateHospitalDetail(fakeScope.Hospital).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                httpBackend.flush();
                expect(tempObj.name).toBe("hospital2");
            });

            it('Should test DeleteHospitalDetail Method which is used delete hospital details',function(){
                var tempObj =  fakeScope.Hospital;

                httpBackend.when('DELETE','http://localhost:3000/hospitals/delete/1').respond();
                fakehospitalService.DeleteHospitalDetail(1).then(function(){

                });
                httpBackend.flush();
                expect(true).toBe(true);
            });
        });
    });
});