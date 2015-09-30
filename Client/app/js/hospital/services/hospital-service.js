/**
 * Created by katarep on 9/28/15.
 */
barcoApp.service('hospitalService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var hospitalService = {

        getHospitalList: function () {
            var defer = $q.defer();
            $http.get('http://localhost:3000/hospitals/getAll').
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        AddHospitalDetail: function (Hospital) {
            var defer = $q.defer();
            $http.post('http://localhost:3000/hospitals/add/',Hospital)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        UpdateHospitalDetail: function (Hospital) {
            var defer = $q.defer();
            $http.put('http://localhost:3000/hospitals/update/'+Hospital._id,Hospital)
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
