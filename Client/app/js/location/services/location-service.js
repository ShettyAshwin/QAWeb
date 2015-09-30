/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.service('locationService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var locationService = {

        getHospitalLocations: function (hospitalId) {
            /*
            var defer = $q.defer();
            $http.get('data/hospital.json').
                success(function (data, status) {
                    defer.resolve({ "reponseData": data });
            });
            return defer.promise;
            */

            var filteredLocations;
            var defer = $q.defer();
            var locationList = [
                {
                    "id": 1,
                    "name": "Loc 1",
                    "address": "Addr 1",
                    "hospitalId": 0,
                    "hospitalName": "Ruby",
                },
                {
                    "id": 2,
                    "name": "Loc 2",
                    "address": "Addr 2",
                    "hospitalId": 0,
                    "hospitalName": "Ruby",
                },
                {
                    "id": 3,
                    "name": "Loc 3",
                    "address": "Addr 3",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                },
                {
                    "id": 4,
                    "name": "Loc 4",
                    "address": "Addr 4",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                },
                {
                    "id": 5,
                    "name": "Loc 5",
                    "address": "Addr 5",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                }
            ];

            if (hospitalId === -1) {
                filteredLocations = locationList;
            }
            else {
                filteredLocations = locationList.filter(function (location) {
                    return location.hospitalId === hospitalId
                });
            }

            defer.resolve({ "responseData": filteredLocations });
            return defer.promise;
        },

        getLocationDetails: function myfunction(locationId) {
            var defer = $q.defer();
            var locationList = [
                {
                    "id": 1,
                    "name": "Loc 1",
                    "address": "Addr 1",
                    "hospitalId": 0,
                    "hospitalName": "Ruby",
                },
                {
                    "id": 2,
                    "name": "Loc 2",
                    "address": "Addr 2",
                    "hospitalId": 0,
                    "hospitalName": "Ruby",
                },
                {
                    "id": 3,
                    "name": "Loc 3",
                    "address": "Addr 3",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                },
                {
                    "id": 4,
                    "name": "Loc 4",
                    "address": "Addr 4",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                },
                {
                    "id": 5,
                    "name": "Loc 5",
                    "address": "Addr 5",
                    "hospitalId": 1,
                    "hospitalName": "Sahyadri",
                }
            ];

            var filteredLocations = locationList.filter(function (location) {
                return location.id === locationId
            });

            if (filteredLocations) {
                filteredLocations = filteredLocations[0];
            }

            defer.resolve({ "responseData": filteredLocations });
            return defer.promise;
        },

        addHospitalLocation: function (location) {
            var defer = $q.defer();
            /*
            $http.post('data/hospital.json', Hospital)
                .success(function (data, status) {
                    defer.resolve({ 'Success': true, 'Data': data, 'error': null, 'ErrorCode': status });
                }).error(function (data, status) {
                    defer.resolve({ 'Success': false, 'Data': null, 'error': data, 'ErrorCode': status });
            });
            */

            defer.resolve({ 'statusCode': 200, 'result': 1 });

            return defer.promise;
        },

        updateHospitalLocation: function (location) {
            var defer = $q.defer();
            /*
            $http.post('data/hospital.json', Hospital)
                .success(function (data, status) {
                    defer.resolve({ 'Success': true, 'Data': data, 'error': null, 'ErrorCode': status });
                }).error(function (data, status) {
                    defer.resolve({ 'Success': false, 'Data': null, 'error': data, 'ErrorCode': status });
            });
            */

            defer.resolve({ 'statusCode': 200, 'result': 1 });

            return defer.promise;
        }
    };
    return locationService;
}]);