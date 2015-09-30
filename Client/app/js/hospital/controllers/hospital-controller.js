/**
 * Created by katarep on 9/28/15.
 */
barcoApp.controller('HospitalController',['$scope', 'hospitalService',
    function($scope, hospitalService){
        $scope.getHospital = function(){
            hospitalService.getHospitalList().then(function(obj){
                $scope.hospitals = obj.reponseData;
                console.log($scope.hospitals);
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

                });
            }
        };
        $scope.getHospitalById = function(id){
                if($scope.hospitals && $scope.hospitals.length>0)
                {
                    var objHospital = $scope.hospitals.filter(function (val) {
                        return val["_id"] === id;
                    });
                    return $scope.Hospital = objHospital[0];
                }

        };
}]);
