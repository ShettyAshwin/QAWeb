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
            var objHospital = {
                Id:$scope.Hospital.Id,
                Name: $scope.Hospital.Name,
                Address: $scope.Hospital.Address
    };
            hospitalService.AddHospitalDetail(objHospital).then(function (response) {
            $scope.HospitalId = response.Id;

            });


        };
}]);
