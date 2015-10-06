

var barcoApp = angular.module('barcoApp',['ngRoute','angularTreeview'])
    .config(['$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {

            $routeProvider.when('/Hospitals', {templateUrl: 'views/hospital/Hospital.html', controller: 'HospitalController'});
            $routeProvider.when('/Assets', {templateUrl: 'views/asset/assetsListAddUpdate.html', controller: 'assetController'});

            $routeProvider.when('/Hierarchies', {templateUrl: 'views/hierarchy/hierarchy.html', controller: 'hierarchyController'});
            $routeProvider.when('/Locations', {templateUrl: 'views/location/Location.html', controller: 'LocationController'});
            $routeProvider.when('/TreeView', {templateUrl: 'views/treeView/treeView.html', controller: 'treeViewController'});

            $routeProvider.otherwise({
                redirectTo: '/Hospitals'
            });
        }])