/**
 * Created by katarep on 9/28/15.
 */

barcoApp.service('hierarchyService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var hierarchyService = {

        gethierarchy: function () {
            var defer = $q.defer();
            $http.get('data/hierarchy.json').
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        Addhierarchy: function (Hierarchy) {
            var defer = $q.defer();
            $http.post('data/hierarchy.json',Hierarchy)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'ErrorCode': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'ErrorCode': status});
                });

            return defer.promise;
        }
    };
    return hierarchyService;




}]);
