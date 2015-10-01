/**
 * Created by jadhavp on 9/28/15.
 */
describe('Hospital location controller', function () {
    describe('controller', function () {
        describe('location unit tests', function () {
            var fakeScope, fakeController, fakeRootScope, httpBackend, fakeLocationService, fakeHospitalService;
            beforeEach(module('barcoApp'));
            beforeEach(inject(function ($rootScope, $q, $controller, $httpBackend, locationService, hospitalService) {
                fakeScope = $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeLocationService = locationService;
                fakeHospitalService = hospitalService;
                fakeScope.hospitalList = [{ "_id": 1, "name": "hospital1", "address": "abc" }, { "_id": 2, "name": "hospital1", "address": "abc" }];
                //fakeScope.Hospital = { "_id": 1, "name": "hospital1", "address": "abc" };
                fakeScope.locationList = [{ "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" }, { "_id": 2, "name": "loc2", "address": "addr2", "hospitalId": "2" }];
                fakeScope.Location = { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "hosp1" };
                fakeScope.EditLocation = { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "hosp1" };

                fakeScope.ddlAssociatedHospital = '1';
                fakeScope.ddlEditAssociatedHospital = '1';
                fakeScope.ddlFilteredHospital = '1';

                httpBackend = $httpBackend;

                fakeScope.getHospitalList = function () { };
                fakeScope.LoadHospitalLocations = function () { };
                //fakeScope.EditHospitalLocation = function () { };
                fakeScope.addLocation = function () { };
                fakeScope.UpdateLocation = function () { };

                $controller('LocationController', {
                    $scope: fakeScope
                });
            }));

            it('Should test LoadHospitalLocations method which is used to get the location list for given hospital', function () {
                varHospId = '1';
                var tempObj = fakeScope.locationList;
                var tempHospitals = fakeScope.hospitalList;
                httpBackend.when('GET', angular.getAppSection('hospital').getAll).respond(tempHospitals);
                httpBackend.when('GET', angular.getAppSection('location').getByHospital + varHospId).respond(tempObj);
                fakeLocationService.getHospitalLocations(varHospId).then(function (response) {
                    expect(response.name).toBe(tempObj.name);
                });
                fakeScope.LoadHospitalLocations(varHospId);
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            
            it('Should test LoadHospitalLocations method which is used to get the location list for ALL the hospitals', function () {
                var tempObj = fakeScope.locationList;
                var tempHospitals = fakeScope.hospitalList;
                httpBackend.when('GET', angular.getAppSection('hospital').getAll).respond(tempHospitals);
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                fakeLocationService.getHospitalLocations().then(function (response) {
                    expect(response.name).toBe(tempObj.name);
                });
                fakeScope.LoadHospitalLocations('-1');
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });
            
            it('Should test AddHospitalLocation method which is used to add the location', function () {
                var tempObj = fakeScope.locationList;
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                httpBackend.when('POST', angular.getAppSection('location').add).respond(tempResponse);
                fakeLocationService.addHospitalLocation(fakeScope.Location).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                fakeScope.AddHospitalLocation();
                httpBackend.flush();
            });

            it('Should test EditHospitalLocation method which is used to edit the location', function () {
                var tempObj = fakeScope.locationList;
                var tempLoc = fakeScope.Location;
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                httpBackend.when('GET', angular.getAppSection('location').get + tempLoc._id).respond(tempLoc);
                fakeLocationService.getLocationDetails(fakeScope.Location._id).then(function (response) {
                    expect(response.responseData.length).toBeGreaterThan(0);
                });
                fakeScope.EditHospitalLocation();
                httpBackend.flush();
            });

            it('Should test UpdateHospitalLocation method which is used to update the location', function () {
                var tempObj = fakeScope.locationList;
                var tempLoc = fakeScope.EditLocation;
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                httpBackend.when('PUT', angular.getAppSection('location').update + tempLoc._id).respond(tempResponse);
                fakeLocationService.updateHospitalLocation(fakeScope.EditLocation).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                fakeScope.UpdateHospitalLocation();
                httpBackend.flush();
            });

            it('Should test DeleteHospitalLocation method which is used to delete the location', function () {
                var tempObj = fakeScope.locationList;
                var locIdToDelete = '1';
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                httpBackend.when('DELETE', angular.getAppSection('location').delete + locIdToDelete).respond(tempResponse);
                fakeLocationService.deleteHospitalLocation(locIdToDelete).then(function (response) {
                    expect(response.Success).toBe(true);
                });
                fakeScope.DeleteHospitalLocation(locIdToDelete);
                httpBackend.flush();
            });
        })
    })
})
