/**
 * Created by petkarp on 9/28/15.
 */
barcoApp.controller('assetController', ['$scope', '$location','assetService',
    function ($scope, $location,assetService) {

        //$scope.newAsset = {};
        $scope.showList = true;
        //$scope.hierarchyList = [{_id: "H1",name :'hierarchy1'}, {_id: "H2",name :'hierarchy2'}, {_id: "H3",name :'hierarchy3'}  ];

       // $scope.hierarchy = $scope.hierarchyList[0];
        $scope.asset= {};
        $scope.assetproperties= [];
        $scope.assetproperties.push({"name":"", "value":""});


        $scope.getAssetsByHierarchy = function (data) {
            assetService.getAssetsByHierarchy(data).then(function (obj) {
                $scope.assets = obj.responseData;
                $scope.showList = true;
            });
        };



        $scope.getSelectedHierarchy = function (hierarchyId) {
            return  $scope.hierarchyList.filter(function (element) {
                return element._id == hierarchyId
            })[0]._id;
        };

        //save
        $scope.addAsset = function () {

            $scope.asset.properties = [];
            $scope.asset.properties= $scope.assetproperties;
            $scope.asset.hierarchyId = $scope.ddlhierarchy;  //$scope.getSelectedHierarchy ( $scope.ddlhierarchy) ;

            //Verify Object
            result = assetService.validateAsset($scope.asset);

            if (result.length > 0)
            {
                //alert (result);

                return;
            }

            console.log(JSON.stringify($scope.asset));
            //assetService.addToAssetList($scope.asset);
            /////
            if($scope.asset._id ==null || $scope.asset._id ==0)
            {
                assetService.addAsset($scope.asset).then(function (response) {
                    $scope.clear();
                    $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
                });
            }else
            {
                assetService.updateAsset($scope.asset).then(function (response) {
                    $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
                });
            }

            //$scope.assets = assetService.getAssetList();
            //$scope.assets.push($scope.asset);

        };


        $scope.getAssetById = function (id) {
            $scope.ddlhierarchy ={};
            /*var objAsset = $scope.assets.filter(function (val) {
                return val["id"] === id;
            });
            $scope.asset = objAsset[0];
            $scope.assetproperties = $scope.asset.properties;
            $scope.ddlhierarchy = $scope.getSelectedHierarchy($scope.asset.hierarchy.id);
            console.log ("selected asset");
            console.log(JSON.stringify($scope.asset));*/
            assetService.getAssetById(id).then(function(obj){
                $scope.asset = obj.responseData;
                $scope.afterGetAsset();
                //$location.url("/Assets/" + $scope.asset._id);
            });

        };

        $scope.afterGetAsset =function(){
            $scope.assetproperties = $scope.asset.properties;
            if ($scope.asset.hierarchyId)
            {
                var tempHierarchy= $scope.getSelectedHierarchy($scope.asset.hierarchyId);
                console.log(JSON.stringify(tempHierarchy));

                $scope.ddlhierarchy = tempHierarchy;
            }
            else
            {
                //$scope.hierarchyId = $scope.hierarchyList[0];
            }
            $scope.showList= !$scope.showList;
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
            $scope.showList =!$scope.showList
        };

        $scope.getHospitalList = function (){
            //$scope.hospitalList = [{"_id":"1", "name": "Hospital1"}, {"_id":"2", "name": "Hospital2"}];
            assetService.getHospitalList().then(function (obj) {
                $scope.hospitalList = obj.responseData;
                $scope.assets=[];
                $scope.hierarchyList = [];
                $scope.assetproperties= [];
                $scope.ddlSelectHierarchy = {};
                $scope.ddlLocation= {};
            });
        };

        $scope.getLocationsByHospital = function (){
            // alert ($scope.ddlHospital);
            //$scope.locationList = [{"_id":"1", "name": "Location1"}, {"_id":"2", "name": "Location2"}];
            assetService.getLocationsByHospital($scope.ddlHospital).then(function (obj) {
                $scope.locationList = obj.responseData;
                $scope.assets=[];
                $scope.hierarchyList = [];
                $scope.assetproperties= [];
                $scope.ddlSelectHierarchy = {};
                $scope.ddlLocation= {};
            });
        };

        $scope.getHierachiesByLocation = function (){
            // alert ($scope.ddlHospital);
            //$scope.hierarchyList = [{_id: "H1",name :'hierarchy1'}, {_id: "H2",name :'hierarchy2'}, {_id: "H3",name :'hierarchy3'}  ];
            assetService.getHierachiesByLocation($scope.ddlLocation).then(function (obj) {
             $scope.hierarchyList = obj.responseData;
                $scope.assets=[];
             });
        };
        $scope.displayAssetsList = function(){

            $scope.getAssetsByHierarchy($scope.ddlSelectHierarchy);
        };

        $scope.showAssetDetails = function()
        {
            if ($scope.ddlSelectHierarchy)
            {
                $scope.showList = ! $scope.showList;
            }
        };
        $scope.deleteAsset = function(id){
            assetService.deleteAsset(id).then(function(){
                $scope.displayAssetsList();
            });
        };
        $scope.getHospitalList();

    }]);