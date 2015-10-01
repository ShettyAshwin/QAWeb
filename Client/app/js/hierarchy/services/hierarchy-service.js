/**
 * Created by katarep on 9/28/15.
 */

barcoApp.service('hierarchyService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var hierarchyService = {

        getHierarchyList: function () {
            var defer = $q.defer();
            $http.get(angular.getAppSection('hierarchy').list).
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        AddHierarchyDetail: function (Hierarchy) {
            var defer = $q.defer();
            $http.post(angular.getAppSection('hierarchy').add,Hierarchy)

                .success(function (data, status) {

                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    alert('error'+ data);
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        UpdateHierarchyDetail: function (Hierarchy) {
            var defer = $q.defer();
            $http.put(angular.getAppSection('hierarchy').update + Hierarchy._id,Hierarchy)

                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        getHierarchyById: function (id) {
            var defer = $q.defer();
            $http.get(angular.getAppSection('hierarchy').get+id).
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        DeleteHierarchyDetail: function (id) {
            var defer = $q.defer();
            $http.delete(angular.getAppSection('hierarchy').delete+id)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        }
    };
    return hierarchyService;




}]);
