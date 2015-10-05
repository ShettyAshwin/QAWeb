/**
 * Created by petkarp on 9/28/15.
 */
barcoApp.controller('assetController', ['$scope', '$location', 'assetService',
    function ($scope, $location, assetService) {
        'use strict';
        $scope.showList = true;
        $scope.asset = {};
        $scope.assetproperties = [];
        $scope.assetproperties.push({"name": "", "value": ""});

        $scope.getAssetsByHierarchy = function (data) {
            assetService.getAssetsByHierarchy(data).then(function (obj) {
                $scope.assets = obj.responseData;
                $scope.showList = true;
            });
        };

        $scope.getSelectedHierarchy = function (hierarchyId) {
            return $scope.hierarchyList.filter(function (element) {
                return element._id === hierarchyId;
            })[0];
        };

        //save
        $scope.addAsset = function () {

            $scope.asset.properties = [];
            $scope.asset.properties = $scope.assetproperties;
            $scope.asset.hierarchyId = $scope.ddlhierarchy;

            //Verify Object
            var result = assetService.validateAsset($scope.asset);

            if (result.length > 0) {
                console.log("Error in Asset input data" );
                console.log(result);
                return;
            }

            //for undefined check ==
            if ($scope.asset._id == null || $scope.asset._id == 0) {
                assetService.addAsset($scope.asset).then(function (response) {
                    //TODO: Check StatusID and give Error message
                    $scope.clear();
                    $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
                    $scope.showList = true;
                });
            } else {
                assetService.updateAsset($scope.asset).then(function (response) {
                    //TODO: Check StatusID and give Error message
                    $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
                    $scope.showList = !$scope.showList;
                });
            }
        };


        $scope.getAssetById = function (id) {
            $scope.ddlhierarchy = {};
            assetService.getAssetById(id).then(function (obj) {
                $scope.asset = obj.responseData;
                $scope.afterGetAsset();
            });

        };

        $scope.afterGetAsset = function () {
            $scope.assetproperties = $scope.asset.properties;
            if ($scope.asset.hierarchyId) {
                $scope.ddlhierarchy = $scope.getSelectedHierarchy($scope.asset.hierarchyId);
            }
            $scope.showList = !$scope.showList;
            return $scope.asset;
        };

        $scope.addProperty = function () {
            $scope.assetproperties.push({"name": "", "value": ""});
        };

        $scope.removeProperty = function (index) {
            $scope.assetproperties.splice(index, 1);
        };

        $scope.clear = function () {
            $scope.asset = {};
            $scope.assetproperties = [];
            $scope.assetproperties.push({"name": "", "value": ""});
            $scope.ddlhierarchy = {};
            $scope.showList = !$scope.showList;
        };

        $scope.getHospitalList = function () {
            assetService.getHospitalList().then(function (obj) {
                $scope.hospitalList = obj.responseData;
                //TODO : Convert to common function
                $scope.assets = [];
                $scope.hierarchyList = [];
                $scope.assetproperties = [];
                $scope.ddlSelectHierarchy = {};
                $scope.ddlLocation = {};
            });
        };

        $scope.getLocationsByHospital = function () {
            assetService.getLocationsByHospital($scope.ddlHospital).then(function (obj) {
                $scope.locationList = obj.responseData;
                //TODO : Convert to common function
                $scope.assets = [];
                $scope.hierarchyList = [];
                $scope.assetproperties = [];
                $scope.ddlSelectHierarchy = {};
                $scope.ddlLocation = {};
            });
        };

        //TODO: Change spelling
        $scope.getHierachiesByLocation = function () {
            assetService.getHierachiesByLocation($scope.ddlLocation).then(function (obj) {
                $scope.hierarchyList = obj.responseData;
                $scope.assets = [];
            });
        };
        $scope.displayAssetsList = function () {
            $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
        };

        $scope.showAssetDetails = function () {
            if ($scope.ddlSelectHierarchy) {
                $scope.showList = !$scope.showList;
            }
        };
        $scope.deleteAsset = function (id) {
            assetService.deleteAsset(id).then(function () {
                $scope.displayAssetsList();
            });
        };

        //Get the default Hospital List
        $scope.getHospitalList();

    }]);