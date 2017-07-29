
angular.module('equipmentApp.controller').controller('equipmentAddCtrl',function ($scope,$uibModalInstance) {

        $scope.ok = function () {

            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    })