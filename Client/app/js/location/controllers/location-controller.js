/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.controller('LocationController', ['$scope', 'hospitalService', 'locationService', //'menuService',
    function ($scope, hospitalService, locationService) { //, menuService) {

        ////menuService.activateMenu('Locations');

        // Display grid
        $scope.ShowList = true;
        $scope.OperationMode = "Add";

        $scope.ddlFilteredHospital = "-1"; // Default hospital filter

        $scope.getHospitalList = function () {
            hospitalService.GetHospitalList().then(function (obj) {
                $scope.hospitalList = obj.reponseData;
            });   
        };

        // load hospital list
        $scope.getHospitalList();

        /* Get hospital location list */
        $scope.LoadHospitalLocations = function (hospitalId) {
            if (hospitalId === "-1") {
                locationService.getAllHospitalLocations().then(function (obj) {
                    if (obj.responseData) {
                        $scope.locationList = obj.responseData;
                    }
                });
            }
            else {
                locationService.getHospitalLocations(hospitalId).then(function (obj) {
                    if (obj.responseData) {
                        $scope.locationList = obj.responseData;
                    }
                });
            }
        };

        $scope.LoadHospitalLocations("-1"); // Show all locations

        /* Add hospital location */
        $scope.AddHospitalLocation = function () {
            var objLocation = {
                _id: $scope.Location._id,
                name: $scope.Location.name,
                address: $scope.Location.address,
                hospitalId: $scope.Location.associatedHospital
            };
            if ($scope.OperationMode === "Add") { // Add new location
                locationService.addHospitalLocation(objLocation).then(function (response) {
                    $scope.LocationId = response.result;
                });
            }
            else { // Update existing location
                locationService.updateHospitalLocation(objLocation).then(function (response) {
                    $scope.EditLocation = response.result;
                });
            }

            // Switch to grid view
            // Update grid
            $scope.LoadHospitalLocations("-1");
            $scope.ShowList = true;
        };

        /* Edit hospital location */
        $scope.EditHospitalLocation = function (locationId) {
            locationService.getLocationDetails(locationId).then(function (obj) {
                if (obj.responseData) {
                    $scope.Location = {
                        _id: obj.responseData._id,
                        name: obj.responseData.name,
                        address: obj.responseData.address
                    };
                    $scope.Location.associatedHospital = $scope.hospitalList.filter(function (hospital) {
                        return hospital._id === obj.responseData.hospitalId._id;
                    })[0]._id;
                    //$scope.Location.associatedHospital = obj.responseData.hospitalId; 
                }
            });
        };

        /* Delete hospital location */
        $scope.DeleteHospitalLocation = function (locationId) {
            locationService.deleteHospitalLocation(locationId).then(function (response) {
                $scope.LoadHospitalLocations("-1"); // Show all locations
                //return response.result;
            });
        };

        /* Switch from grid view to add view */
        $scope.OpenAddHospitalLocationView = function () {       
            $scope.OperationMode = "Add";
            $scope.Location = null;
            //$scope.Location = { 'name': '', 'address': '', 'associatedHospital': '-1' };
            $scope.ShowList = false;
        }

        /* Switch from grid view to edit view */
        $scope.OpenEditHospitalLocationView = function (locationId) {
            $scope.ShowList = false;
            $scope.OperationMode = "Edit";
            $scope.EditHospitalLocation(locationId);
        }
    }]);