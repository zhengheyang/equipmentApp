angular.module('equipmentApp.controller')
    .controller('inspectionAddCtrl',function ($scope,$uibModalInstance) {

    $scope.ok = function () {

        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})
