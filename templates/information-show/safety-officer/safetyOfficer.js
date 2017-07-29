//安全员
angular.module('equipmentApp.controller').controller('safetyCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getSaferMessage().then(function (data) {
        $scope.safetyDetail=data;
        console.log($scope.safetyDetail)
    },function () {

    })
    //添加模态框
    $scope.openAddSafety=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/safety-officer/modal/safety-add.html',
            controller: 'safetyAddCtrl',
            resolve: {
                items: function () {
                    return
                }
            }

        }).result.then(function () {

        }, function () {

        });

    }


})