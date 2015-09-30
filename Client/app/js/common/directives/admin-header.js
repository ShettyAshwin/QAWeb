
barcoApp.directive('adminHeader', [function () {
    var adminHeader = {
        templateUrl: 'views/common/admin-header.html',
        scope: {
        },
        controller : 'adminHeaderController',
        restrict: "E"
    };
    return adminHeader;
}]);