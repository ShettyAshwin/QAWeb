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
            locationService.getHospitalLocations().then(function (obj) {
                if (obj.responseData) {
                    $scope.locationList = [];
                    // Iterate through all the locations and filter only those belonging to given hospital
                    for (var ind = 0; ind < obj.responseData.length; ind++) {
                        if (obj.responseData[ind].hospitalId === hospitalId) {
                            $scope.locationList.push(obj.responseData[ind]);
                        }
                    }

                    // If there are location get the corresponding hospital details apart from already available hospital id
                    if ($scope.locationList.length > 0) {
                        $scope.getHospitalList(); // This will get us all the hospital details
                        // Let's iterate through locations and update the hospital details
                        for (var tempHospital, ind = 0; ind < $scope.locationList.length; ind++) {
                            tempHospital = $scope.hospitalList.filter(function (hospital) {
                                return hospital._id === $scope.locationList[ind].hospitalId;
                            });
                            if (tempHospital && tempHospital.length > 0) {
                                $scope.locationList[ind].hospitalName = tempHospital[0].name;
                            }
                            tempHospital = [];
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
                        _id: obj.responseData._id,
                        name: obj.responseData.name,
                        address: obj.responseData.address
                    };
                    $scope.ddlEditAssociatedHospital = obj.responseData.hospitalId; // ?? not getting updated on UI
                }
            });
        };

        // Update hospital location
        $scope.UpdateHospitalLocation = function () {
            var objLocation = {
                _id: $scope.EditLocation._id,
                name: $scope.EditLocation.name,
                address: $scope.EditLocation.address,
                hospitalId: $scope.ddlEditAssociatedHospital
            };
            locationService.updateHospitalLocation(objLocation).then(function (response) {
                $scope.EditLocation = response.result;
            });
        };


        // Delete hospital location
        $scope.DeleteHospitalLocation = function (locationId) {
            locationService.updateHospitalLocation(objLocation).then(function (response) {
                return response.result;
            });
        };

    }]);