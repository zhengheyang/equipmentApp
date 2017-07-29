angular.module('equipmentApp.controller')
    .controller('acceptDetailAllModalCtrl', function ($uibModalInstance, items, $scope, deviceApi) {
        deviceApi.getAcceptDetailAll(items.id).then(function (data) {
            $scope.acceptDetailAll = data;
            $scope.applicationDetailAll = data.data.application;
            $scope.auditDetail = data.data.accept;
            console.log(data);
        }, function () {
        });
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });