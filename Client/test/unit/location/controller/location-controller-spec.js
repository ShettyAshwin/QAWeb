/**
 * Created by jadhavp on 9/28/15.
 */
describe('Hospital location controller', function () {
    describe('controller', function () {
        describe('location unit tests', function () {
            var fakeScope, fakeController, fakeRootScope, httpBackend, fakeQ, fakeLocationService, fakeHospitalService;
            beforeEach(module('barcoApp'));
            beforeEach(inject(function ($rootScope, $q, $controller, $httpBackend, locationService, hospitalService) {
                fakeScope = $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeLocationService = locationService;
                fakeHospitalService = hospitalService;
                fakeQ = $q;

                fakeScope.hospitalList = [{ "_id": 1, "name": "hospital1", "address": "abc" }, { "_id": 2, "name": "hospital1", "address": "abc" }];
                //fakeScope.Hospital = { "_id": 1, "name": "hospital1", "address": "abc" };
                fakeScope.locationList = [{
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
                },
                {
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

                fakeScope.Location = {
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
                };
                fakeScope.EditLocation = { "_id": 1, "name": "loc1", "address": "addr1", "hospitalId": "1" };

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
                //httpBackend.when('GET', angular.getAppSection('hospital').getAll).respond(tempHospitals);
                
                spyOn(fakeHospitalService, 'GetHospitalList').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempHospitals });
                    return def.promise;
                });
                
                spyOn(fakeLocationService, 'getHospitalLocations').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempObj });
                    return def.promise;
                });
                fakeScope.LoadHospitalLocations(varHospId);
                //httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test LoadHospitalLocations method which is used to get the location list for ALL the hospitals', function () {
                var tempObj = fakeScope.locationList;
                var tempHospitals = fakeScope.hospitalList;
                httpBackend.when('GET', angular.getAppSection('hospital').getAll).respond(tempHospitals);

                spyOn(fakeLocationService, 'getAllHospitalLocations').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempObj });
                    return def.promise;
                });
                fakeScope.LoadHospitalLocations('-1');
                httpBackend.flush();
                expect(tempObj.length).toBeGreaterThan(0);
            });

            it('Should test AddHospitalLocation method which is used to add the location', function () {
                var tempObj = fakeScope.locationList;
                fakeScope.OperationMode = 'Add';
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                spyOn(fakeLocationService, 'addHospitalLocation').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempResponse });
                    return def.promise;
                });
                fakeScope.AddHospitalLocation();
                httpBackend.flush();
            });

            it('Should test EditHospitalLocation method which is used to edit the location', function () {
                var tempObj = fakeScope.locationList;
                var tempLoc = fakeScope.Location;
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                spyOn(fakeLocationService, 'getLocationDetails').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempLoc });
                    return def.promise;
                });
                fakeScope.EditHospitalLocation();
                httpBackend.flush();
            });

            it('Should test UpdateHospitalLocation method which is used to update the location', function () {
                var tempObj = fakeScope.locationList;
                var tempLoc = fakeScope.EditLocation;
                fakeScope.OperationMode = 'Edit';
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                spyOn(fakeLocationService, 'updateHospitalLocation').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempResponse });
                    return def.promise;
                });
                fakeScope.AddHospitalLocation();
                httpBackend.flush();
            });

            it('Should test DeleteHospitalLocation method which is used to delete the location', function () {
                var tempObj = fakeScope.locationList;
                var locIdToDelete = '1';
                var tempResponse = { 'Success': true, 'Data': '', 'error': null, 'ErrorCode': status };
                httpBackend.when('GET', angular.getAppSection('location').getAll).respond(tempObj);
                spyOn(fakeLocationService, 'deleteHospitalLocation').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "responseData": tempResponse });
                    return def.promise;
                });
                fakeScope.DeleteHospitalLocation(locIdToDelete);
                httpBackend.flush();
            });

            it('Should test OpenAddHospitalLocationView method which is used to switch to location create view', function () {
                fakeScope.OpenAddHospitalLocationView();
                expect(fakeScope.OperationMode).toBe("Add");
                expect(fakeScope.ShowList).toBe(false);
                expect(fakeScope.Location).toBe(null);
            });

            it('Should test OpenEditHospitalLocationView  method which is used to switch to location edit view', function () {
                var locationId = 1;
                fakeScope.OpenEditHospitalLocationView(locationId);
                expect(fakeScope.OperationMode).toBe("Edit");
                expect(fakeScope.ShowList).toBe(false);
            });

        });
    });
});
