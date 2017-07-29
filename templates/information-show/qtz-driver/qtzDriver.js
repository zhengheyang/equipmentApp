//塔机司机
angular.module('equipmentApp.controller').controller('qtzDriverCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getDriverMessage().then(function (data) {
        $scope.qtzDriverDetail=data;
        console.log(data)
        console.log( $scope.qtzDriverDetail)
    }, function () {
    });
    //添加塔机司机模态框
    $scope.openAddDriver = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/qtz-driver/modal/qtz-driver-add.html',
            controller: 'driverCtrl',
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
