/**
 * Created by jadhavp on 9/29/15.
 */
describe('Hospital location service unit tests', function () {
    describe('services', function () {
        describe('location service spec', function () {
            var fakeScope, fakeLocationService, httpBackend;

            beforeEach(module('barcoApp'));

            beforeEach(inject(function ($rootScope, $httpBackend, locationService) {
                fakeScope = $rootScope.$new();
                fakeLocationService = locationService;
                fakeScope.locations = [{ "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" }, { "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": "2" }];
                fakeScope.location = { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "hosp1" };
                httpBackend = $httpBackend;
            }));

            it('Should test getAllHospitalLocations method which is used to get all the hospital location list', function () {
                var tempObj = fakeScope.locations;

                httpBackend.when('GET', angular.getAppSection('location').list).respond(tempObj);
                fakeLocationService.getAllHospitalLocations().then(function (response) {
                    expect(response.responseData.length).toBe(tempObj.length);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
        });
    });
});