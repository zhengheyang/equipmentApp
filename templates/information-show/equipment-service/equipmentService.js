//设备类型管理
angular.module('equipmentApp.controller').controller('equipmentCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getEquipmentMessage().then(function (data) {
        $scope.equipmentDetail=data;
        console.log($scope.equipmentDetail)

    },function () {

    })
    //添加模态框
    $scope.openAddEquipment=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/equipment-service/modal/equipment-add.html',
            controller: 'equipmentAddCtrl',
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
