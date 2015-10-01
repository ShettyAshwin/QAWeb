
barcoApp.controller('hierarchyController', ['$scope', 'hierarchyService',
    function ($scope, hierarchyService) {
        $scope.getHierarchies = function () {
            hierarchyService.getHierarchyList().then(function (obj) {
                $scope.Hierarchies = obj.reponseData;
                alert(JSON.stringify($scope.Hierarchies));
            });
        };
        $scope.getHierarchies();

        $scope.AddHierarchy = function () {
            var objHierarchy = $scope.Hierarchy;
            alert(JSON.stringify($scope.Hierarchy));
            if ($scope.Hierarchy._id == null || $scope.Hierarchy._id == 0) {
                hierarchyService.AddHierarchyDetail(objHierarchy).then(function (response) {
                    $scope.HierarchyId = response._id;
                    $scope.Hierarchy = null;
                    $scope.getHierarchies();
                });
            } else {
                hierarchyService.UpdateHierarchyDetail(objHierarchy).then(function (response) {
                    $scope.HierarchyId = response._id;

                });
            }
        };
        $scope.getHierarchyById = function (id) {
            hierarchyService.getHierarchyById(id).then(function (obj) {
                $scope.Hierarchy = obj.reponseData;
            });

        };
        $scope.DeleteHierarchy = function (id) {
            hierarchyService.DeleteHierarchyDetail(id).then(function () {
            });
            $scope.getHierarchies();
        };
    }]);