/**
 *
 */
/*global angular, */
barcoApp.controller('HierarchyController', ['$scope', '$routeParams', 'hierarchyService',
        function ($scope, $routeParams,  hierarchyService) {
            $scope.getHierarchy = function(){
                hierarchyService.gethierarchy().then(function(obj){
                    $scope.hierarchy = obj.reponseData;
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