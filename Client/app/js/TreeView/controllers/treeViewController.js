barcoApp.controller('treeViewController', ['$scope', 'hospitalService',
    function ($scope, hospitalService) {


        $scope.GetHospitalList = function () {
            hospitalService.GetHospitalTree().then(function (obj) {

                var find = "\"LocationId\":";
                var re = new RegExp(find, 'g');
                var find = "\"hierarchyId\":";
                var re1 = new RegExp(find, 'g');
                var find = "\"assetId\":";
                var re2 = new RegExp(find, 'g');

                $scope.hospitalList = JSON.parse(JSON.stringify(obj.reponseData).replace(re, "\"children\":").replace(re1, "\"children\":").replace(re2, "\"children\":"));
            });
        };
        $scope.GetHospitalList();



    }]);
