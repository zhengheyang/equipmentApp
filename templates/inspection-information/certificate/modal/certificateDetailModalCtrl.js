angular.module('equipmentApp.controller')
    .controller('certificateDetailModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getCertificateDetail(items.id).then(function (data) {
            $scope.certificateDetailAll = data;
            console.log($scope.certificateDetailAll)
        }, function () {
        });


        $scope.ok = function () {
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    });