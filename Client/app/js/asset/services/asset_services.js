/*(function () {
    'use strict';
    var services = angular.module('asset.assetService', []);
    services.factory('assetService', ['notificationService',
        function (notificationService) {
*/
barcoApp.factory('assetService',['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

        //var assetList = [];
        var assetService = {

            assetList : [],

                validateAsset: function (asset) {

                    var result = "";
                    if (!asset.name) {
                       // notificationService.error("ASSET.ERROR.ASSET_NAME_ERROR_TITLE", "ASSET.ERROR.ASSET_NAME_ERROR_MSG");
                        result = "Asset name is complusary. \n";
                    }
                    if (asset.properties) {
                        for (i = 0; i < asset.properties.length; i++) {
                            if (asset.properties[i].name.trim().length == 0)
                            {
                                result= result + "Property" + (i+1) + " name is complusary. \n";
                            }
                        }
                    }
                    else {
                        result = result + "At least one property is compulsary. \n";
                    }

                    return result;
                },

                updateAssetList: function(assets){
                    this.assetList= assets;
                    return true;
                },
                addToAssetList: function(asset){
                    this.assetList.push(asset);
                },

                getAssetList: function(){
                    return this.assetList;
                },
                getAssetsForLocation: function (hierarchy) {

                    var defer = $q.defer();
                    $http.get('data/assetsData.json').
                        success(function (data, status) {
                            defer.resolve({ "reponseData": data});
                        });
                    return defer.promise;
                    //return assetList.assets;

                },
                updateAsset: function (asset) {
                    var defer = $q.defer();
                   //var  asset = assetList[0];
                    $http.put(asset)
                        .success(function (data, status) {
                            defer.resolve({'Success': true, 'Data': data, 'error': null, 'ErrorCode': status});
                        }).error(function (data, status) {
                            defer.resolve({'Success': false, 'Data': null, 'error': data, 'ErrorCode': status});
                        });

                    return defer.promise;
                },
                addAsset: function(asset){
                    var defer = $q.defer();
                    //var  asset = assetList[0];
                    $http.put(asset)
                        .success(function (data, status) {
                            defer.resolve({'Success': true, 'Data': data, 'error': null, 'ErrorCode': status});
                        }).error(function (data, status) {
                            defer.resolve({'Success': false, 'Data': null, 'error': data, 'ErrorCode': status});
                        });

                    return defer.promise;
                }
            };
            return assetService;
        }]);
//})();