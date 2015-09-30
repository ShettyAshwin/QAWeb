/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.controller('LocationController', ['$scope', 'hospitalService', 'locationService',
    function ($scope, hospitalService, locationService) {
        
        $scope.ddlEditAssociatedHospital = "-1"; // Default hospital selection in edit view
        $scope.ddlAssociatedHospital = "-1"; // Default hospital selection
        $scope.ddlFilteredHospital = "-1"; // Default hospital filter
        $scope.getHospitalList = function () { 
            hospitalService.getHospitalList().then(function (obj) {
                $scope.hospitalList = obj.reponseData;
            });   
        };
        // load hospital list
        $scope.getHospitalList();

        /* Get hospital location list */
        $scope.LoadHospitalLocations = function (hospitalId) {
            locationService.getHospitalLocations(hospitalId).then(function (obj) {
                if (obj.responseData) {
                    $scope.locationList = [];
                    // Iterate through all the locations and filter only those belonging to given hospital
                    for (var ind = 0; ind < obj.responseData.length; ind++) {
                        if (obj.responseData[ind].hospitalId === hospitalId) {
                            $scope.locationList.push(obj.responseData[ind]);
                        }
                    }
                }   
            });
        };

        // Add hospital location
        $scope.AddHospitalLocation = function () {
            var objLocation = {
                name: $scope.Location.Name,
                address: $scope.Location.Address,
                hospitalId: $scope.ddlAssociatedHospital
            };
            locationService.addHospitalLocation(objLocation).then(function (response) {
                $scope.LocationId = response.result;
            });
        };

        // Edit hospital location
        $scope.EditHospitalLocation = function (locationId) {
            locationService.getLocationDetails(locationId).then(function (obj) {
                if (obj.responseData) {
                    $scope.EditLocation = {
                        id: obj.responseData.id,
                        name: obj.responseData.name,
                        address: obj.responseData.address
                    };
                    $scope.ddlEditAssociatedHospital = obj.responseData.hospitalId;
                }
            });
        };

        // Update hospital location
        $scope.UpdateHospitalLocation = function () {
            var objLocation = {
                id: $scope.EditLocation.Id,
                name: $scope.EditLocation.Name,
                address: $scope.EditLocation.Address,
                hospitalId: $scope.ddlEditAssociatedHospital
            };
            locationService.updateHospitalLocation(objLocation).then(function (response) {
                $scope.EditLocation = response.result;
                //alert(response.result);
            });
        };

    }]);