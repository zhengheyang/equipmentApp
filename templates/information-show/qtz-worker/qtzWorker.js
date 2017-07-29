//塔机索工
angular.module('equipmentApp.controller').controller('qtzWorkerCtrl',function ($scope,$uibModal,deviceApi) {
    deviceApi.getWorkerMessage().then(function (data) {
        $scope.workerListDetail=data;
        console.log($scope.workerListDetail)
    },function () {

    })
    //添加模态框
    $scope.openAddWorker=function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/information-show/qtz-worker/modal/qtz-worker-add.html',
            controller: 'workerCtrl',
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
