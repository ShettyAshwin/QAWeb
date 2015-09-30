/**
 * Created by petkarp on 9/28/15.
 */
barcoApp.controller('assetController', ['$scope', 'assetService',
    function ($scope, assetService) {

        $scope.newAsset = {};
        $scope.hierarchyList = [{id: "H1",name :'hierarchy1'}, {id: "H2",name :'hierarchy2'}, {id: "H3",name :'hierarchy3'}  ];

        $scope.hierarchy = $scope.hierarchyList[0];
        $scope.asset= {};
        $scope.assetproperties= [];
        $scope.assetproperties.push({"name":"", "value":""});


        $scope.getAssetsForLocation = function (data) {
            assetService.getAssetsForLocation(data).then(function (obj) {
                $scope.assets = obj.reponseData;

                //console.log(obj.reponseData[0].name);
            });

            //assetService.updateAssetList($scope.assets);
        };
        $scope.getAssetsForLocation($scope.hierarchy);

        $scope.getSelectedHierarchy = function (hierarchyId) {
            return  $scope.hierarchyList.filter(function (element) {
                return element.id == hierarchyId
            })[0];
        };

        $scope.addAsset = function () {


            $scope.asset.properties = [];
            $scope.asset.properties= $scope.assetproperties;
            $scope.asset.hierarchy =  $scope.getSelectedHierarchy ( $scope.ddlhierarchy) ;

            //Verify Object
            result = assetService.validateAsset($scope.asset);

            if (result.length > 0)
            {
                alert (result);
                exit;
            }

            console.log(JSON.stringify($scope.asset));
            //assetService.addToAssetList($scope.asset);
            assetService.addAsset($scope.asset).then(function (obj) {
                //$scope.assets = obj.reponseData;
            });
            //$scope.assets = assetService.getAssetList();
            $scope.assets.push($scope.asset);

        };


        $scope.getAssetById = function (id) {
            $scope.ddlhierarchy ={};
            var objAsset = $scope.assets.filter(function (val) {
                return val["id"] === id;
            });
            $scope.asset = objAsset[0];
            $scope.assetproperties = $scope.asset.properties;
            $scope.ddlhierarchy = $scope.getSelectedHierarchy($scope.asset.hierarchy.id);
            console.log ("selected asset");
            console.log(JSON.stringify($scope.asset));
            return $scope.asset;

        };

        $scope.addProperty = function(){
            $scope.assetproperties.push({"name":"", "value":""});
            console.log($scope.assetproperties.length);
        };

        $scope.removeProperty =function(index)
        {
          $scope.assetproperties.splice(index,1);
        };

        $scope.clear = function(){
            $scope.asset = {};
            $scope.assetproperties = [];
            $scope.assetproperties.push({"name":"", "value":""});
            $scope.ddlhierarchy ={};
        }




    }]);