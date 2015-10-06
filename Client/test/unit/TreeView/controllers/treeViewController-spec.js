/**
 * Created by sasaner on 10/6/15.
 */
describe('TreeView controller', function () {
    describe('controller', function () {
        describe('TreeView unit tests', function () {
            var fakeScope, fakeController, fakeRootScope, httpBackend, fakeQ, fakeHospitalService;
            beforeEach(module('barcoApp'));
            beforeEach(inject(function ($rootScope, $q, $controller, $httpBackend, hospitalService) {
                fakeScope = $rootScope.$new();
                fakeRootScope = $rootScope;
                fakeController = $controller;
                fakeHospitalService = hospitalService;
                fakeQ = $q;


                httpBackend = $httpBackend;


                $controller('treeViewController', {
                    $scope: fakeScope
                });
            }));

            it('Should Load Hospital data in Tree Format', function () {

                var tempHospitals = fakeScope.hospitalList;
                httpBackend.when('GET',angular.getAppSection('hospital').getTree).respond(200,hospitalTreeData);
                spyOn(fakeHospitalService, 'GetHospitalTree').andCallFake(function () {
                    var def = fakeQ.defer();
                    def.resolve({ "reponseData": hospitalTreeData });
                    return def.promise;
                });

                fakeScope.GetHospitalList();
                httpBackend.flush();
                expect(hospitalTreeData.length).toBeGreaterThan(0);
            });
        })
    })
});