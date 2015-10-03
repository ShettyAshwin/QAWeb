barcoApp.controller('hierarchyController', ['$scope', 'hierarchyService', 'locationService',
    function ($scope, hierarchyService, locationService) {
        $scope.showList = true;
        $scope.operationMode = "Add";
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

            var objHierarchy = {
                _id: $scope.Hierarchy._id,
                name: $scope.Hierarchy.name,
                address: $scope.Hierarchy.address,
                locationId: $scope.Hierarchy.associatedLocation,
                order: $scope.Hierarchy.order
            };

            if ($scope.Hierarchy._id == null || $scope.Hierarchy._id == 0) {
                $scope.Hierarchy.locationId = $scope.Hierarchy.associatedLocation;
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

                $scope.Hierarchy.associatedLocation = $scope.LocationList.filter(function (location) {
                    return location._id === obj.reponseData.locationId._id;
                })[0]._id;
            });
            $scope.showList = false;

        };
        $scope.deleteHierarchy = function (id) {
            hierarchyService.DeleteHierarchyDetail(id).then(function () {
                $scope.getHierarchies();
            });

        };
        $scope.Cancel = function () {
            $scope.Hierarchy = null;
        };

    }]);