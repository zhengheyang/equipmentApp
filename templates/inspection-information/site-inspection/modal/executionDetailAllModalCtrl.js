angular.module('equipmentApp.controller')
    .controller('executionDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getExecutionDetailAll(items.id).then(function (data) {
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            $scope.executionDetail = data.data.execution;
            console.log(data.data)
            console.log($scope.applicationDetailAll.materialFiles)
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });