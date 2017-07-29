angular.module('equipmentApp.controller').controller('safetyAddCtrl',function ($scope,$uibModalInstance) {

        $scope.ok = function () {

            $uibModalInstance.close();
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
