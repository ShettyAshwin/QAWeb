/**
 * Created by petkarp on 9/30/15.
 */
barcoApp.directive('assetDetails', [function () {
    var myDirective = {
        templateUrl: 'views/asset/assetsListAddUpdate.html',
        scope: {

        },
        controller : 'assetController',
        restrict: "E"
    };
    return myDirective;
}]);
