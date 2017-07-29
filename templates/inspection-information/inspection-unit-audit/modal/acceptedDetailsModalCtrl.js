angular.module('equipmentApp.controller')
    .controller('acceptedDetailsModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getApplicationDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.application;
            console.log($scope.applicationDetailAll);
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });