/**
 *
 */
barcoApp.service('hospitalService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var hospitalService = {

        getHospitalList: function () {
            var defer = $q.defer();
            $http.get('data/hospital.json').
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        AddHospitalDetail: function (Hospital) {
            var defer = $q.defer();
            $http.post('data/hospital.json',Hospital)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'ErrorCode': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'ErrorCode': status});
                });

            return defer.promise;
        }
    };
    return hospitalService;
}]);
