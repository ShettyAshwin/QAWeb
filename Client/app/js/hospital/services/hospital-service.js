/**
 * Created by katarep on 9/28/15.
 */
barcoApp.service('hospitalService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var hospitalService = {

        GetHospitalList: function () {
            var defer = $q.defer();
            $http.get(angular.getAppSection('hospital').list).
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        AddHospitalDetail: function (Hospital) {
            var defer = $q.defer();
            $http.post(angular.getAppSection('hospital').add,Hospital)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        UpdateHospitalDetail: function (Hospital) {
            var defer = $q.defer();
            $http.put(angular.getAppSection('hospital').update + Hospital._id,Hospital)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        GetHospitalById: function (id) {
            var defer = $q.defer();
            $http.get(angular.getAppSection('hospital').get + id).
                success(function (data, status) {
                    defer.resolve({ "Data": data});
                });
            return defer.promise;
        },
        DeleteHospitalDetail: function (id) {
            var defer = $q.defer();
            $http.delete(angular.getAppSection('hospital').delete + id)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        }
    };
    return hospitalService;
}]);
