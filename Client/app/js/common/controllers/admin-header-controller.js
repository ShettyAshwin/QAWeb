
barcoApp.
    controller('adminHeaderController', ['$scope', '$rootScope','$location',
        function ($scope, $rootScope,$location) {
            'use strict';



            $scope.navigateTo = function (target) {
                alert(target);
                $location.url(target.url);

            };



        }]);

