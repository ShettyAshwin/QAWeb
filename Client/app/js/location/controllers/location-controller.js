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
            if (hospitalId === '-1') {
                locationService.getAllHospitalLocations().then(function (obj) {
                    if (obj.responseData) {
                        $scope.locationList = obj.responseData;
                        // If there are locations; associate the corresponding hospital details apart from already available hospital id
                        AssociateHospitalToLocation();
                    }
                });
            }
            else {
                locationService.getHospitalLocations(hospitalId).then(function (obj) {
                    console.log('here');
                    if (obj.responseData) {
                        $scope.locationList = obj.responseData;
                        // If there are locations; associate the corresponding hospital details apart from already available hospital id
                        AssociateHospitalToLocation();
                    }
                });
            }
        };


        function AssociateHospitalToLocation() {
            try {
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
            } catch (e) {
            }
        }

        /* Add hospital location */
        $scope.AddHospitalLocation = function () {
            var objLocation = {
                name: $scope.Location.name,
                address: $scope.Location.address,
                hospitalId: $scope.ddlAssociatedHospital
            };
            locationService.addHospitalLocation(objLocation).then(function (response) {
                $scope.LocationId = response.result;
            });
        };

        /* Edit hospital location */
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

        /* Update hospital location */
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


        /* Delete hospital location */
        $scope.DeleteHospitalLocation = function (locationId) {
            locationService.deleteHospitalLocation(locationId).then(function (response) {
                return response.result;
            });
        };

    }]);