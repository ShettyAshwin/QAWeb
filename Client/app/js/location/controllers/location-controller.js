/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.controller('LocationController', ['$scope', 'hospitalService', 'locationService',
    function ($scope, hospitalService, locationService) {

        // Display grid
        $scope.ShowList = true;
        $scope.OperationMode = "Add";

        ////$scope.ddlEditAssociatedHospital = "-1"; // Default hospital selection in edit view
        ////$scope.ddlAssociatedHospital = "-1"; // Default hospital selection
        $scope.ddlFilteredHospital = "-1"; // Default hospital filter

        $scope.getHospitalList = function () {
            hospitalService.GetHospitalList().then(function (obj) {
                $scope.hospitalList = obj.reponseData;
                console.log('1');
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
                        // If there are locations; associate the corresponding hospital details apart from already available hospital id
                        //AssociateHospitalToLocation();
                    }
                });
            }
            else {
                locationService.getHospitalLocations(hospitalId).then(function (obj) {
                    if (obj.responseData) {
                        $scope.locationList = obj.responseData;
                        // If there are locations; associate the corresponding hospital details apart from already available hospital id
                        //AssociateHospitalToLocation();
                    }
                });
            }
        };

        $scope.LoadHospitalLocations("-1"); // Show all locations

        /* Associate hospital details to locations present in location list */
        function AssociateHospitalToLocation() {
            try {
               // $scope.getHospitalList(); // This will get us all the hospital details
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
            if ($scope.OperationMode === "Add") {
                var objLocation = {
                    name: $scope.Location.name,
                    address: $scope.Location.address,
                    hospitalId: $scope.Location.associatedHospital // $scope.ddlAssociatedHospital
                };
                locationService.addHospitalLocation(objLocation).then(function (response) {
                    $scope.LocationId = response.result;
                });
            }
            else { // Update existing location
                alert('else');
            }

            // Switch to grid view
            // Update grid
            $scope.ShowList = false;
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
                    //$scope.Location.associatedHospital = obj.responseData.hospitalId; // ?? not getting updated on UI
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
                $scope.LoadHospitalLocations("-1"); // Show all locations
                //return response.result;
            });
        };

        /* Switch from grid view to edit view */
        $scope.OpenAddHospitalLocationView = function () {
            $scope.ShowList = false;
            $scope.OperationMode = "Add";
            //$scope.Location = null;
            $scope.Location = { 'name': '', 'address': '', 'associatedHospital': '-1' };
            //$scope.apply();
        }

        /* Switch from grid view to edit view */
        $scope.OpenEditHospitalLocationView = function (locationId) {
            $scope.ShowList = false;
            $scope.OperationMode = "Edit";
            $scope.EditHospitalLocation(locationId);
        }

    }]);