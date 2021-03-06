/**
 * Created by katarep on 9/29/15.
 */
describe('hospital',function(){
    describe('services',function(){
        describe('hospitalServiceSpec',function(){
            var fakeScope, fakehospitalService, httpBackend;
            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope,$httpBackend,hospitalService) {
                fakeScope = $rootScope.$new();
                fakehospitalService = hospitalService;
                fakeScope.hospitals= [{"_id":1,"name":"hospital1","address":"abc"},{"_id":2,"name":"hospital1","address":"abc"}];
                fakeScope.Hospital= {"_id":1,"name":"hospital1","address":"abc"};
                httpBackend = $httpBackend;

            }));

            it('Should test GetHospitalList Method which is used for getting hospital list',function(){
                var tempObj =  fakeScope.hospitals;

                httpBackend.when('GET',angular.getAppSection('hospital').list).respond(tempObj);
                fakehospitalService.GetHospitalList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
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

            });

            it('Should test GetHospitalTreeById method which is used to get the complete hospital tree (SUCCESS)', function () {
                var tempObj = fakeScope.Hospital;
                var hospitalId = '1';

                httpBackend.when('GET', angular.getAppSection('hospital').getTreeById + tempObj._id).respond(fakeScope.hospitals);
                fakehospitalService.GetHospitalTreeById(tempObj._id).then(function (response) {
                    expect(response.reponseData[0]._id).toBe(tempObj._id);
                });
                httpBackend.flush();
            });
            /*
            it('Should test GetHospitalTreeById method which is used to get the complete hospital tree (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var hospitalId = '1';

                httpBackend.when('GET', angular.getAppSection('location').getByHospital + hospitalId).respond(500, tempObj);
                fakeLocationService.GetHospitalTreeById(hospitalId).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });*/
        });
    });
});