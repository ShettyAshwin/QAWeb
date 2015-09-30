/**
 * Created by jadhavp on 9/28/15.
 */
barcoApp.controller('LocationController', ['$scope', 'hospitalService', 'locationService',
    function ($scope, hospitalService, locationService) {
        
        $scope.ddlEditAssociatedHospital = "-1"; // Default hospital selection in edit view
        $scope.ddlAssociatedHospital = "-1"; // Default hospital selection
        $scope.ddlFilteredHospital = "-1"; // Default hospital filter
        $scope.getHospitalList = function () {
            /*
            hospitalService.getHospitalList().then(function (obj) {
                $scope.hospitalList = obj.reponseData;
            });
            */
            return [{
                "Id": 0,
                "Name": "Ruby",
                "Address":"Pune"
            }, {
                "Id": 1,
                "Name": "Sahyadri",
                "Address": "Mumbai"
            }];
        };
        // load hospital list
        $scope.hospitalList = $scope.getHospitalList();

        /* Get hospital location list */
        $scope.LoadHospitalLocations = function (hospitalId) {
            //alert('p');
            locationService.getHospitalLocations(parseInt(hospitalId)).then(function (obj) {
                if (obj.responseData) {
                    $scope.locationList = obj.responseData;
                }   
            });
        };

        // Add hospital location
        $scope.AddHospitalLocation = function () {
            var objLocation = {
                id: $scope.Location.Id,
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
                //alert(JSON.stringify(response));
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
                alert(response.result);
            });
        };

    }]);