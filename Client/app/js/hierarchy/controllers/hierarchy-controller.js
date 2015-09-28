/**
 * Created by shettya on 6/4/14.
 */
/*global angular, vantageWebPortal*/
vantageWebPortal.
    controller('locationDetailController', ['$scope', '$routeParams', '$location', 'locationService', 'breadcrumbsService', 'notificationService','$translate',
        function ($scope, $routeParams, $location, locationService, breadcrumbsService, notificationService,$translate) {

            breadcrumbsService.CreateBreadCrumbsList("configuration.location.detail");
            //$scope.tempTimeZoneDisplayName;
            //$scope.tempTimeZone;
            notificationService.isEditModeOn = false;
            $scope.selectedLocation = null;
            $scope.country = { 'selected' : '', 'list' : ''};
            $scope.state = {'selected' :'', 'list':''};
            $scope.isPrintBarcodeDisable=true;
            $scope.PrintBarcode = function () {
                var origin = app_Config.common.Protocol + app_Config.common.ServiceHost;
                var popupWin = window.open('', '_blank', 'width=400,height=400');
                popupWin.document.open();
                popupWin.document.write("<html>" +
                    "<head>" +
                    "	<link rel='stylesheet' type='text/css' href='style.css' />" +
                    "</head>" +
                    "<body onload='window.print()'>" +
                    "	<div>" +
                    "		<img height='48' width='48' src='" + origin + "/Services/Admin/Barcode/DataMatrixImage?code=" + $scope.selectedLocation.Name + "' />" +
                    "		<br/>" + $scope.selectedLocation.Name +
//                "		<img height='48' width='48' src='" + origin + "/Services/Admin/Barcode/DataMatrixImage?code=CMD-Cancel' />" +
//                "		<br/>CMD-Cancel" +
                    "	</div>" +
                    "</body>" +
                    "</html>");
                popupWin.document.close();
            };


            $scope.getCountryList = function(){
                locationService.getCountryList().then(function(data){
                    //alert ($scope.country.list[0]);
                    //console.log (data);

                    $scope.country.list =  data.responseData;

                    //Update if condition for VTG-1271
                    if(($scope.selectedLocation) && ($scope.selectedLocation.Address)&& ($scope.selectedLocation.Address.Country) && ($scope.country.list) && ($scope.country.list.length > 0)  &&($scope.selectedLocation.Address.Country.length > 0)){
                        $scope.country.selected = $scope.country.list.filter(function(data){
                            if(data.Name === $scope.selectedLocation.Address.Country) return true;
                        })[0];
                    }
                    else{
                        //Will execute for Create
                        //set the Default Location.Country = 'USA'
                        $scope.country.selected =  $scope.country.list[0];
                    }
                    if($scope.country.selected){  $scope.getStateList($scope.country.selected.Code);}

                });
            };

            $scope.translateLanguage = function(data){

                return $translate(angular.uppercase(data));
            };



            var formDirtyUnbind = $scope.$watch('frmLocation.$dirty', function (newVal) {
                if(newVal==true)
                    notificationService.isEditModeOn = true;
            });

            $scope.$on('$destroy', function() {
                notificationService.isEditModeOn = false;
                formDirtyUnbind();
            });

            $scope.getStateList = function(countryCode){
                locationService.getStateList(countryCode).then(function(data){
                    $scope.state.list =data.responseData;
                    if(($scope.selectedLocation.Address.State) && ($scope.state.list) && ($scope.state.list.length > 0)  &&($scope.selectedLocation.Address.State.length > 0)){
                        $scope.state.selected = $scope.state.list.filter(function(data){
                            if(data.Name === $scope.selectedLocation.Address.State) return true;
                        })[0];
                    }
                });
            };

            $scope.onSaveValidate = function(){
                var errorList = [];
                if((!$scope.selectedLocation.Name) || $scope.selectedLocation.Name.length < 1){
                    //notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.NAME_FIELD");
                    errorList.push('LOCATION.VALIDATION.NAME_FIELD');
                    //return false;
                }
                //Update if condition for VTG-1271
                if((!$scope.selectedLocation.Address) ||(!$scope.selectedLocation.Address.Address1) || $scope.selectedLocation.Address.Address1.length < 1){
                    //notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.ADDRESS1_FIELD");
                    errorList.push('LOCATION.VALIDATION.ADDRESS1_FIELD');
                    //return false;
                }
                /* Address2 is not mandetory
                if((!$scope.selectedLocation.Address.Address2) || $scope.selectedLocation.Address.Address2.length < 1){
                    notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.ADDRESS2_FIELD");
                    return false;
                }*/
                if((!$scope.country.selected) || !$scope.country.selected.Name){
                    //notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.COUNTRY_FIELD");
                    errorList.push('LOCATION.VALIDATION.COUNTRY_FIELD');
                    //return false;
                }

                if((!$scope.selectedLocation.Address)){
                    //notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.ADDRESS1_FIELD");
                    errorList.push('LOCATION.VALIDATION.TIMEZONE_FIELD');
                    //return false;
                }
                else {

                    if ((!$scope.selectedLocation.Address.LocalTimeZone) || !$scope.selectedLocation.Address.LocalTimeZone){
                        //notificationService.error("COMMON.ERROR.VALIDATION_ERROR", "LOCATION.VALIDATION.TIMEZONE_FIELD");
                        errorList.push('LOCATION.VALIDATION.TIMEZONE_FIELD');
                        //return false;
                    }
                }
                if (errorList.length > 0) {
                    notificationService.errorList('COMMON.ERROR.VALIDATION_ERROR', errorList);
                    return false;
                }
                else
                {
                    return true;
                }
            };

            $scope.onSaveClick = function () {
                if ($scope.selectedLocation === null) {
                    // notify an error
                }
                else {

                    if($scope.onSaveValidate() !== true) return;

                    delete  $scope.selectedLocation.$$hashKey;
                    delete  $scope.selectedLocation.CustomAddress;
                    //console.log ($scope.selectedLocation.Address.LocalTimeZone.DisplayName);
                    if($scope.country.selected.Name){
                        $scope.selectedLocation.Address.Country = $scope.country.selected.Name;
                    }
                    if( ($scope.state) && ($scope.state.selected) &&($scope.state.selected.Name)){
                        $scope.selectedLocation.Address.State = $scope.state.selected.Name;
                    }

                    //$scope.tempTimeZone = $scope.selectedLocation.Address.LocalTimeZone;
                    //$scope.tempTimeZoneDisplayName= $scope.selectedLocation.Address.LocalTimeZone.DisplayName;
                    if ($scope.selectedLocation.Address.LocalTimeZone)
                        $scope.selectedLocation.Address.LocalTimeZone = $scope.selectedLocation.Address.LocalTimeZone.DisplayName;
                    locationService.UpdateLocationInfo($scope.selectedLocation).then(function (obj) {
                        if(obj.error === false){
                            //$scope.frmLocation.$setPristine();
                            notificationService.isEditModeOn = false;
                            $scope.$broadcast("reloadLocations");
                            //Added for VTG-1271
                            /*console.log("TimeZone");
                            console.log (tempTimeZone);
                            console.log("TimeZoneDisplayName");
                            console.log(timeZoneDisplayName);
                            $scope.selectedLocation.Address.LocalTimeZone = $scope.tempTimeZone;
                            $scope.selectedLocation.Address.LocalTimeZone.DisplayName = $scope.tempTimeZoneDisplayName;*/
                          //  $location.url("/location-config"); //Added for VTG-1271
                        }else{
                            //VTG-2155

                            if(obj.responseData.ErrorId=="VTG-0017")
                            {
                            notificationService.error("COMMON.ERROR.DUPLICATE_LOCATION","COMMON.ERROR.DUPLICATE_LOCATION_ERROR");
                            }
                        }
                    });

                    //$scope.selectedLocation.Address.LocalTimeZone = $scope.tempTimeZone;
                    //$scope.selectedLocation.Address.LocalTimeZone.DisplayName = $scope.tempTimeZoneDisplayName;
                }
            };

            $scope.onLocationSelected = function (obj) {
                $scope.selectedLocation = angular.copy(obj);
                $scope.getCountryList();
                if(($scope.selectedLocation.Address) && ($scope.selectedLocation.Address.LocalTimeZone)){
                    var timeZone = $scope.TimeZoneList.filter(function(data){
                        if(data.DisplayName === $scope.selectedLocation.Address.LocalTimeZone.DisplayName) return true;
                    })[0];
                    if(timeZone){
                        $scope.selectedLocation.Address.LocalTimeZone = timeZone;
                    }
                }

                if(($scope.selectedLocation.PrimaryContact) && ($scope.selectedLocation.PrimaryContact.Id)){
                    var primaryContact = $scope.UserList.filter(function(data){
                        if(data.Id === $scope.selectedLocation.PrimaryContact.Id) return true;
                    })[0];
                    if(primaryContact){
                        $scope.selectedLocation.PrimaryContact = primaryContact;
                    }
                }
//VTG-2129
                if($scope.selectedLocation.IsActive==true)
                {
                    $scope.isPrintBarcodeDisable=false;
                }
                else
                {
                    $scope.isPrintBarcodeDisable=true;
                }

            };

            //VTG-2129
            $scope.disablePrintBarcode=function(val)
                {
                    if(val==true)
                    {
                        $scope.isPrintBarcodeDisable=true;
                    }
                    else
                    {
                        $scope.isPrintBarcodeDisable=false;
                    }

                }
            $scope.onAddNewLocationClick = function () {
                $scope.getCountryList();
                $scope.country.selected = null; //Added for VTG 1271
                $scope.state.selected = null;
                $scope.selectedLocation = null;
                //$scope.selectedLocation = { Address: { LocalTimeZone: $scope.TimeZoneList[34]}};

            };

            $scope.onEditCancelClick = function () {
                if($scope.frmLocation.$dirty){
                    notificationService.confirmation("COMMON.CONFIRMATION.DATA_CHANGED_WARNING_TITLE", "COMMON.CONFIRMATION.DATA_CHANGED_WARNING",
                        function(){
                            $location.url("/location-config");}
                        ,function() {/*Nothing to DO for Cancel*/});
                }
                else{
                    $scope.selectedLocation = null;
                    $location.url("/location-config");
                }

            };

            $scope.getCountryList();

        }]);