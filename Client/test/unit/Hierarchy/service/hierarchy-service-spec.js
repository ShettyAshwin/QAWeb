/**
 * Created by katarep on 9/29/15.
 */
describe('hospital',function(){
    describe('services',function(){
        describe('hospitalServiceSpec',function(){
            var  fakeScope, fakehospitalService, httpBackend;


            beforeEach(module('barcoApp'));


            beforeEach(inject(function ($rootScope,$httpBackend,hierarchyService) {
                fakeScope = $rootScope.$new();
                fakehierarchyService = hierarchyService;
                fakeScope.hierarchys= [{"_id":1,"name":"hierarchy1","address":"abc"},{"_id":2,"name":"hierarchy1","address":"abc"}];
                fakeScope.hierarchy= {"_id":1,"name":"hierarchy1","address":"abc"};
                httpBackend = $httpBackend;

            }));

            it('Should test gethierarchyList Method which is used for getting hierarchy list',function(){
                var tempObj =  fakeScope.hierarchys;

                httpBackend.when('GET',angular.getAppSection('hierarchy').list).respond(tempObj);
                fakehierarchyService.GethierarchyList().then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
            it('Should test gethierarchyById Method which is used for getting specific hierarchy details',function(){
                var tempObj =  fakeScope.hierarchys;
                httpBackend.when('GET',angular.getAppSection('hierarchy').get+tempObj._id).respond(tempObj);
                fakehierarchyService.GethierarchyById(fakeScope.hierarchys._id).then(function(response){
                    expect(response.name).toBe(tempObj.name);
                });
                httpBackend.flush();
            });

            it('Should test AddhierarchyDetail Method which is used add hierarchy details',function(){
                var tempObj =  fakeScope.hierarchy;
                httpBackend.expectPOST(angular.getAppSection('hierarchy').add).respond(200,tempObj);
                fakehierarchyService.AddhierarchyDetail().then(function(response){
                    expect(response.Data._id).toBe(tempObj._id);
                });
                httpBackend.flush();

            });

            it('Should test AddhierarchyDetail Method with error',function(){
                var tempObj =  fakeScope.hierarchy;
                httpBackend.expectPOST(angular.getAppSection('hierarchy').add).respond(500,tempObj);
                fakehierarchyService.AddhierarchyDetail().then(function(response){

                    expect(response.Data).toBe(null);
                });
                httpBackend.flush();

            });

            it('Should test UpdatehierarchyDetail Method which is used update hierarchy details',function(){
                var tempObj =  fakeScope.hierarchy;
                tempObj.name = "hierarchy2";
                httpBackend.expectPUT(angular.getAppSection('hierarchy').update+'1').respond(200,tempObj);
                fakehierarchyService.UpdatehierarchyDetail(fakeScope.hierarchy).then(function(response){
                    expect(response.Data.name).toBe(tempObj.name);
                });
                httpBackend.flush();
            });

            it('Should test UpdatehierarchyDetail Method with error',function(){
                var tempObj =  fakeScope.hierarchy;
                tempObj.name = "hierarchy2";
                httpBackend.expectPUT(angular.getAppSection('hierarchy').update+'1').respond(500,tempObj);
                fakehierarchyService.UpdatehierarchyDetail(fakeScope.hierarchy).then(function(response){
                    expect(response.Data).toBe(null);
                });
                httpBackend.flush();
            });

            it('Should test DeletehierarchyDetail Method which is used delete hierarchy details',function(){
                var tempObj =  fakeScope.hierarchy;

                httpBackend.expectDELETE(angular.getAppSection('hierarchy').delete +'1').respond(200);
                fakehierarchyService.DeletehierarchyDetail(1).then(function(){
                    expect(true).toBe(true);
                });
                httpBackend.flush();

            });

            it('Should test DeletehierarchyDetail Method with error',function(){
                var tempObj =  fakeScope.hierarchy;

                httpBackend.expectDELETE(angular.getAppSection('hierarchy').delete +'1').respond(500);
                fakehierarchyService.DeleteHierarchyDetail(1).then(function(){
                    expect(false).toBe(false);
                });
                httpBackend.flush();

            });
        });
    });
});