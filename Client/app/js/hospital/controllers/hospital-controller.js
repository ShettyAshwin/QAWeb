/**
 * Created by katarep on 9/28/15.
 */
    barcoApp.controller('HospitalController',['$scope', 'hospitalService',
        function($scope, hospitalService){
            $scope.getHospital = function(){
                hospitalService.getHospitalList().then(function(obj){
                    $scope.hospitals = obj.reponseData;
                });
            };
            $scope.getHospital();
            $scope.AddHospital = function()
            {
                var objHospital = $scope.Hospital;
                if($scope.Hospital._id ==null || $scope.Hospital._id ==0)
                    {
                    hospitalService.AddHospitalDetail(objHospital).then(function (response) {
                    $scope.HospitalId = response._id;
                    $scope.Hospital = null;
                    $scope.getHospital();
                    });
                }else
                {
                    hospitalService.UpdateHospitalDetail(objHospital).then(function (response) {
                        $scope.HospitalId = response._id;
                        $scope.getHospital();
                    });
                }
            };
            $scope.getHospitalById = function(id){
                hospitalService.getHospitalById(id).then(function(obj){
                    $scope.Hospital = obj.reponseData;
                });
            };
            $scope.DeleteHospital = function(id){
                hospitalService.DeleteHospitalDetail(id).then(function(){
                    $scope.getHospital();
                });
            };

            $scope.Cancel = function(){
                $scope.Hospital = null;
            };
    }]);
