/**
 * Created by katarep on 9/28/15.
 */
        barcoApp.controller('HospitalController',['$scope', 'hospitalService',
            function($scope, hospitalService){
                $scope.showHospitalList = true;

                $scope.GetHospital = function(){
                    hospitalService.GetHospitalList().then(function(obj){
                        $scope.hospitals = obj.reponseData;
                    });
                };
                $scope.GetHospital();
                $scope.AddHospital = function()
                {
                    var objHospital = $scope.Hospital;
                    if($scope.Hospital._id ==null || $scope.Hospital._id ==0)
                        {
                        hospitalService.AddHospitalDetail(objHospital).then(function (response) {
                        $scope.HospitalId = response._id;
                        $scope.Hospital = null;
                        $scope.GetHospital();
                        });
                    }
                    else
                    {
                        hospitalService.UpdateHospitalDetail(objHospital).then(function (response) {
                            $scope.HospitalId = response._id;
                            $scope.GetHospital();
                        });
                    }

                    $scope.showHospitalList = true;
                };
                $scope.GetHospitalById = function(id){
                    hospitalService.GetHospitalById(id).then(function(obj){
                        $scope.Hospital = obj.Data;
                    });
                    $scope.showHospitalList = false;
                };
                $scope.DeleteHospital = function(id){
                    hospitalService.DeleteHospitalDetail(id).then(function(){
                        $scope.GetHospital();
                        $scope.Cancel();
                    });
                };

                $scope.Cancel = function(){
                    $scope.Hospital = null;
                    $scope.showHospitalList = true
                };
        }]);
