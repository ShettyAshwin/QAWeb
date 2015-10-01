barcoApp.controller('hierarchyController', ['$scope', 'hierarchyService', 'locationService',
    function ($scope, hierarchyService, locationService) {
        $scope.showList = true;
        $scope.ddlAssociatedLocation = "-1";
        $scope.getHierarchies = function () {
            hierarchyService.getHierarchyList().then(function (obj) {

                $scope.Hierarchies = obj.reponseData;

            });

        };
        $scope.getHierarchies();
        $scope.getHospitalLocations = function () {
            locationService.getAllHospitalLocations().then(function (obj) {
                $scope.LocationList = obj.responseData;
            });

        }

        $scope.getHospitalLocations();


        $scope.addHierarchy = function () {
            var objHierarchy = $scope.Hierarchy;

            if ($scope.Hierarchy._id == null || $scope.Hierarchy._id == 0) {
                $scope.Hierarchy.locationId = $scope.ddlAssociatedLocation;
                hierarchyService.AddHierarchyDetail(objHierarchy).then(function (response) {
                    $scope.HierarchyId = response._id;
                    $scope.Hierarchy = null;
                    $scope.getHierarchies();
                });
            } else {
                hierarchyService.UpdateHierarchyDetail(objHierarchy).then(function (response) {
                    $scope.HierarchyId = response._id;
                    $scope.getHierarchies();

                });
            }
            $scope.showList = true;
        };
        $scope.getHierarchyById = function (id) {
            hierarchyService.getHierarchyById(id).then(function (obj) {
                $scope.Hierarchy = obj.reponseData;
            });
            $scope.showList = false;

        };
        $scope.deleteHierarchy = function (id) {
            hierarchyService.DeleteHierarchyDetail(id).then(function () {
            });
            $scope.getHierarchies();
        };
        $scope.Cancel = function(){
            $scope.Hierarchy = null;
        };

    }]);