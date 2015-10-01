/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.service('locationService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var locationService = {
        /* Get all the hospital locations */
        getAllHospitalLocations: function () {           
            var defer = $q.defer();
            $http.get(angular.getAppSection('location').list).
                success(function (data, status) {
                    defer.resolve({ "responseData": data });
            });
            return defer.promise;
        },

        /* Get the locations for given hospital */
        getHospitalLocations: function (hospitalId) {
            var defer = $q.defer();
            $http.get(angular.getAppSection('location').getByHospital + hospitalId).
                success(function (data, status) {
                    defer.resolve({ "responseData": data });
                });
            return defer.promise;
        },

        /* Get hospital location details */
        getLocationDetails: function myfunction(locationId) {
            var defer = $q.defer();
            $http.get(angular.getAppSection('location').get + locationId).
                success(function (data, status) {
                    defer.resolve({ "responseData": data });
            });
            return defer.promise;
        },

        /* Add new hospital location */
        addHospitalLocation: function (location) {
            var defer = $q.defer();            
            $http.post(angular.getAppSection('location').add, location)
                .success(function (data, status) {
                    //defer.resolve({ 'Success': true, 'Data': data, 'error': null, 'ErrorCode': status });
                    defer.resolve(data);
                }).error(function (data, status) {
                    defer.resolve({ 'Success': false, 'Data': null, 'error': data, 'ErrorCode': status });
            });
            return defer.promise;
        },

        /* Update hospital location details */
        updateHospitalLocation: function (location) {
            var defer = $q.defer();       
            $http.put(angular.getAppSection('location').update + location._id, location)
                .success(function (data, status) {
                    defer.resolve({ 'Success': true, 'Data': data, 'error': null, 'ErrorCode': status });
                }).error(function (data, status) {
                    defer.resolve({ 'Success': false, 'Data': null, 'error': data, 'ErrorCode': status });
            });         
            return defer.promise;
        },

        /* Delete hospital location */
        deleteHospitalLocation: function (locationId) {
            var defer = $q.defer();       
            $http.delete(angular.getAppSection('location').delete + locationId)
                .success(function (data, status) {
                    defer.resolve({ 'Success': true, 'Data': data, 'error': null, 'ErrorCode': status });
                }).error(function (data, status) {
                    defer.resolve({ 'Success': false, 'Data': null, 'error': data, 'ErrorCode': status });
                });         
            return defer.promise;
        }
    };

    return locationService;
}]);