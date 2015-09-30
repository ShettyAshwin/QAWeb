/**
 * Created by katarep on 9/28/15.
 */
var barcoApp = angular.module('barco', []);
angular.module('barcoWebApp', [
        'ngRoute',
        'barco'
    ]).config(['$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {


            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common = {Accept: "application/json, text/plain, */*"};

            $httpProvider.defaults.transformRequest = [function (data) {

            }];


            $routeProvider.when('/Hospitals', {templateUrl: 'views/hospital/Hospital.html', controller: 'HospitalController'});
            $routeProvider.when('/Assets', {templateUrl: 'views/asset/assetsListAddUpdate.html', controller: 'assetController'});

            $routeProvider.when('/Hierarchies', {templateUrl: 'views/hierarchy/hierarchy.html', controller: 'hierarchyController'});
            $routeProvider.when('/Locations', {templateUrl: 'views/location/Location.html', controller: 'LocationController'});
        }])