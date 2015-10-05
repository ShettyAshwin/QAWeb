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
                fakeScope.locations = [{
                    "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": {
                        "_id": 1,
                        "name": "hospital1",
                        "address": "abc",
                        "__v": 0,
                        "LocationId": [
                          "loc1",
                          "loc2"
                        ]
                    }
                }, {
                    "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": {
                        "_id": 1,
                        "name": "hospital1",
                        "address": "abc",
                        "__v": 0,
                        "LocationId": [
                          "loc1",
                          "loc2"
                        ]
                    }
                }];

                fakeScope.location = {
                    "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": 1
                };
                httpBackend = $httpBackend;
            }));

            /* getAllHospitalLocations */
            it('Should test getAllHospitalLocations method which is used to get all the hospital location list (SUCCESS)', function () {
                var tempObj = fakeScope.locations;

                httpBackend.when('GET', angular.getAppSection('location').list).respond(tempObj);
                fakeLocationService.getAllHospitalLocations().then(function (response) {
                    expect(response.responseData.length).toBe(tempObj.length);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test getAllHospitalLocations method which is used to get all the hospital location list (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };

                httpBackend.when('GET', angular.getAppSection('location').list).respond(500, tempObj);
                fakeLocationService.getAllHospitalLocations().then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* getHospitalLocations */
            it('Should test getHospitalLocations method which is used to get the hospital location list for given hospital id (SUCCESS)', function () {
                var tempObj = fakeScope.locations;
                var hospitalId = '1';

                httpBackend.when('GET', angular.getAppSection('location').getByHospital + hospitalId).respond(tempObj);
                fakeLocationService.getHospitalLocations(hospitalId).then(function (response) {
                    expect(response.responseData.length).toBe(tempObj.length);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
            
            it('Should test getHospitalLocations method which is used to get the hospital location list for given hospital id (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var hospitalId = '1';

                httpBackend.when('GET', angular.getAppSection('location').getByHospital + hospitalId).respond(500, tempObj);
                fakeLocationService.getHospitalLocations(hospitalId).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* getLocationDetails */
            it('Should test getLocationDetails method which is used to get the hospital location details (SUCCESS)', function () {
                var tempObj = fakeScope.locations;
                var locationId = '1';

                httpBackend.when('GET', angular.getAppSection('location').get + locationId).respond(tempObj);
                fakeLocationService.getLocationDetails(locationId).then(function (response) {
                    expect(response.responseData.length).toBe(tempObj.length);
                });
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test getLocationDetails method which is used to get the hospital location details (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var locationId = '1';

                httpBackend.when('GET', angular.getAppSection('location').get + locationId).respond(500, tempObj);
                fakeLocationService.getLocationDetails(locationId).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* addHospitalLocation */
            it('Should test addHospitalLocation method which is used to add new hospital location (SUCCESS)', function () {
                var tempLocation = fakeScope.location;
                var locationId = '1';

                httpBackend.when('POST', angular.getAppSection('location').add).respond(tempLocation);
                fakeLocationService.addHospitalLocation(tempLocation).then(function (response) {
                    expect(response.name).toBe(tempLocation.name);
                });
                httpBackend.flush();
            });

            it('Should test addHospitalLocation method which is used to add new hospital location (ERROR)', function () {
                var tempLocation = fakeScope.location;
                var tempObj = { 'Success': false, 'Data': tempLocation, 'error': null, 'ErrorCode': 500 };

                httpBackend.when('POST', angular.getAppSection('location').add).respond(500, tempObj);

                fakeLocationService.addHospitalLocation(tempLocation).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* updateHospitalLocation */
            it('Should test updateHospitalLocation method which is used to update hospital location (SUCCESS)', function () {
                var tempLocation = fakeScope.location;
                var tempObj = { "status": "200", "detail": "" };
                var locationId = '1';

                httpBackend.when('PUT', angular.getAppSection('location').update + locationId).respond(tempObj);
                fakeLocationService.updateHospitalLocation(tempLocation).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                httpBackend.flush();
            });

            it('Should test updateHospitalLocation method which is used to update hospital location (ERROR)', function () {
                var tempLocation = fakeScope.location;
                var tempObj = { 'Success': false, 'Data': tempLocation, 'error': null, 'ErrorCode': 500 };
                var locationId = '1';

                httpBackend.when('PUT', angular.getAppSection('location').update + locationId).respond(500, tempObj);
                fakeLocationService.updateHospitalLocation(tempLocation).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

            /* deleteHospitalLocation */
            it('Should test deleteHospitalLocation method which is used to delete the hospital location (SUCCESS)', function () {
                var tempObj = { "status": "200", "detail": "" };
                var locationId = '1';

                httpBackend.when('DELETE', angular.getAppSection('location').delete + locationId).respond(tempObj);
                fakeLocationService.deleteHospitalLocation(locationId).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                httpBackend.flush();
            });

            it('Should test deleteHospitalLocation method which is used to delete the hospital location (ERROR)', function () {
                var tempObj = { 'Success': false, 'Data': {}, 'error': null, 'ErrorCode': 500 };
                var locationId = '1';

                httpBackend.when('DELETE', angular.getAppSection('location').delete + locationId).respond(500, tempObj);
                fakeLocationService.deleteHospitalLocation(locationId).then(function (response) {
                    expect(response.ErrorCode).toBe(tempObj.ErrorCode);
                });
                httpBackend.flush();
            });

        });
    });
});