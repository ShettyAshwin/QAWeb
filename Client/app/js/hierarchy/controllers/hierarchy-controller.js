/**
 *
 */
/*global angular, */
barcoApp.controller('hierarchyController', ['$scope', 'hierarchyService',
        function ($scope,   hierarchyService) {
            $scope.getHierarchy = function(){
                hierarchyService.gethierarchy().then(function(obj){
                    $scope.hierarchys = obj.reponseData;
                });
            };
            $scope.getHierarchy();

            $scope.AddHierarchy = function()
            {
                var objHierarchy = {
                    Id:$scope.hierarchy.Id,
                    Name: $scope.hierarchy.Name,
                    Address: $scope.hierarchy.Address
                };
                hierarchyService.Addhierarchy(objHierarchy).then(function (response) {
                    $scope.hierarchy.id = response.Id;

                });


            };
        }]);