
barcoApp.
    controller('adminHeaderController', ['$scope', '$rootScope','$location',
        function ($scope, $rootScope,$location) {
            'use strict';



            $scope.navigateTo = function (target) {

                $location.url(target.url);

            };



        }]);

