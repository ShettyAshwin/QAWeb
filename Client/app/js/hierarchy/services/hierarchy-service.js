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
            $http.post('http://localhost:3000/Hierarchies/add/',Hierarchy)
                .success(function (data, status) {
                    alert('success');
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    alert('error'+ data);
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        UpdateHierarchyDetail: function (Hierarchy) {
            var defer = $q.defer();
            $http.put('http://localhost:3000/Hierarchies/update/'+Hierarchy._id,Hierarchy)
                .success(function (data, status) {
                    defer.resolve({'Success': true, 'Data': data, 'error': null, 'Code': status});
                }).error(function (data, status) {
                    defer.resolve({'Success': false, 'Data': null, 'error': data, 'Code': status});
                });

            return defer.promise;
        },
        getHierarchyById: function (id) {
            var defer = $q.defer();
            $http.get('http://localhost:3000/Hierarchies/get/'+id).
                success(function (data, status) {
                    defer.resolve({ "reponseData": data});
                });
            return defer.promise;
        },
        DeleteHierarchyDetail: function (id) {
            var defer = $q.defer();
            $http.delete('http://localhost:3000/Hierarchies/delete/'+id)
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
